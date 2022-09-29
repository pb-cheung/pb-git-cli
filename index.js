import shell from 'shelljs';

export default function (command){
    // shell.echo('hello world!');
    const args = command.join(' ');
    shell.exec(`git ${args}` || 'git status');
}
