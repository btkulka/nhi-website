#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import readline from 'node:readline';

const isTTY = process.stdout.isTTY;
const useColor = isTTY && !process.env.NO_COLOR;
const c = useColor
  ? { R:'\x1b[0m', B:'\x1b[1m', D:'\x1b[2m', I:'\x1b[3m',
      CYAN:'\x1b[36m', MAG:'\x1b[35m', GRN:'\x1b[32m', YEL:'\x1b[33m', RED:'\x1b[31m' }
  : { R:'', B:'', D:'', I:'', CYAN:'', MAG:'', GRN:'', YEL:'', RED:'' };

const die = (msg) => {
  console.error(`${c.RED}nhi:${c.R} ${msg}`);
  process.exit(1);
};

function findRoot() {
  let d = process.cwd();
  while (true) {
    const pkg = join(d, 'package.json');
    if (existsSync(pkg)) {
      try {
        const j = JSON.parse(readFileSync(pkg, 'utf8'));
        if (j.name === 'nhi-website') return d;
      } catch { /* keep walking */ }
    }
    const parent = dirname(d);
    if (parent === d) return null;
    d = parent;
  }
}

const root = findRoot();
if (!root) die('must be run from within the nhi-website project');
process.chdir(root);

function runNpm(args) {
  const isWin = process.platform === 'win32';
  const cmd = isWin ? 'npm.cmd' : 'npm';
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: isWin });
    child.on('exit', (code) => resolve(code ?? 0));
    child.on('error', (err) => die(`failed to run npm: ${err.message}`));
  });
}

function hasScript(name) {
  try {
    const j = JSON.parse(readFileSync('package.json', 'utf8'));
    return Boolean(j.scripts && j.scripts[name]);
  } catch { return false; }
}

async function build(args) {
  console.log(`${c.YEL}cleaning:${c.R} node_modules, dist`);
  rmSync('node_modules', { recursive: true, force: true });
  rmSync('dist', { recursive: true, force: true });
  console.log(`${c.GRN}✓${c.R} clean\n`);

  console.log(`${c.YEL}installing dependencies…${c.R}`);
  let code = await runNpm(['install']);
  if (code !== 0) return code;
  console.log(`${c.GRN}✓${c.R} dependencies installed\n`);

  console.log(`${c.YEL}building…${c.R}`);
  return runNpm(['run', 'build', '--', ...args]);
}

const commands = {
  run:     (args) => runNpm(['run', 'dev', '--', ...args]),
  dev:     (args) => runNpm(['run', 'dev', '--', ...args]),
  build,
  preview: (args) => runNpm(['run', 'preview', '--', ...args]),
  test:    (args) => {
    if (!hasScript('test')) die('no test script configured yet — add one to package.json.');
    return runNpm(['test', '--', ...args]);
  },
};

function banner() {
  console.log();
  console.log(`  ${c.B}${c.CYAN}╭──────────────────────────────────────────────╮${c.R}`);
  console.log(`  ${c.B}${c.CYAN}│${c.R}  ${c.B}nhi${c.R} ${c.D}${c.I}— patient music for patient listeners${c.R}  ${c.B}${c.CYAN}│${c.R}`);
  console.log(`  ${c.B}${c.CYAN}╰──────────────────────────────────────────────╯${c.R}`);
  console.log();
}

function menuItem(key, name, desc) {
  console.log(`    ${c.MAG}${key}${c.R}  ${c.B}${name.padEnd(9)}${c.R}  ${c.D}${desc}${c.R}`);
}

function showMenu() {
  banner();
  menuItem('1', 'run',     'start dev server');
  menuItem('2', 'build',   'clean + install + build');
  menuItem('3', 'preview', 'preview production build');
  menuItem('4', 'test',    'run test suite');
  menuItem('q', 'quit',    '');
  console.log();
}

function showUsage() {
  banner();
  console.log(`  ${c.B}usage:${c.R} nhi ${c.D}[command]${c.R} ${c.D}[args...]${c.R}\n`);
  console.log(`  ${c.B}commands:${c.R}`);
  menuItem(' ', 'run',     'start dev server (alias: dev)');
  menuItem(' ', 'build',   'clean node_modules + dist, install deps, then build');
  menuItem(' ', 'preview', 'preview production build');
  menuItem(' ', 'test',    'run test suite');
  menuItem(' ', 'help',    'show this message');
  console.log(`\n  ${c.D}${c.I}run with no command for the interactive menu.${c.R}\n`);
}

function prompt(q, def = '') {
  const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
  const text = def
    ? `  ${c.CYAN}▸${c.R} ${q} ${c.D}[${def}]${c.R} `
    : `  ${c.CYAN}▸${c.R} ${q} `;
  return new Promise((resolve) => {
    rl.question(text, (ans) => {
      rl.close();
      resolve((ans || '').trim() || def);
    });
  });
}

async function confirm(q, def = 'n') {
  const hint = def === 'y' ? 'Y/n' : 'y/N';
  const ans = await prompt(`${q} ${c.D}(${hint})${c.R}`, def);
  return /^y/i.test(ans);
}

async function interactive() {
  showMenu();
  const choice = await prompt('choose', '');
  console.log();
  switch (choice) {
    case '1': case 'run': case 'dev': {
      const args = [];
      if (await confirm('expose to local network?', 'n')) args.push('--host');
      return commands.run(args);
    }
    case '2': case 'build':   return commands.build([]);
    case '3': case 'preview': return commands.preview([]);
    case '4': case 'test':    return commands.test([]);
    case 'q': case 'quit': case 'exit': case '':
      console.log('  bye.'); return 0;
    default:
      die(`unknown choice: ${choice}`);
  }
}

const [cmd, ...args] = process.argv.slice(2);

let exitCode;
if (!cmd) {
  exitCode = await interactive();
} else if (cmd === 'help' || cmd === '-h' || cmd === '--help') {
  showUsage();
  exitCode = 0;
} else if (commands[cmd]) {
  exitCode = await commands[cmd](args);
} else {
  exitCode = await runNpm(['run', cmd, '--', ...args]);
}
process.exit(exitCode ?? 0);
