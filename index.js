import shell from 'shelljs';

const {
    which,
    exec,
    echo,
    exit
} = shell;

export default function (command){
    if (!which("git")) {
        echo("此操作需要安装Git");
        exit(1);
    }

    if(command[0] === 'branch') {
        createStash()
            .then(() => {
                console.log('after stash');
                return switchBranch(command[1]);
            })
            .catch(res => {
                console.log(res);
            })
    } else {
        const args = command.join(' ');
        exec(`git ${args}` || 'git status');
    }
}


const sleep =  (time) => new Promise((resolve) => setTimeout(resolve,time));

async function pull() {
    if (exec("git pull").code === 0) {
        await sleep(1000);
        return true;
    } else {
        echo("Error: git pull failed");
        exit(1);
    }
}

async function createStash() {
    if (exec("git stash").code === 0) {
        await sleep(2000);
        return true;
    } else {
        echo("Error: git stash failed");
        exit(1);
    }
}
function applyStash() {
    if (exec("git stash apply").code === 0) {
        return Promise.resolve();
    } else {
        echo("Error: git stash apply failed");
        exit(1);
    }
}

function switchBranch(branchName) {
    if (exec(`git checkout -B ${branchName}`).code === 0) {
        return Promise.resolve();
    } else {
        echo("Error: switch branch failed");
        exit(1);
    }
}
