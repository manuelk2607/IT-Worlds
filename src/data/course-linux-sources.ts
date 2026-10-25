import type {Source} from './content.ts';
const doc=(url:string,title:string,publisher:string,version:string,section:string):Source=>({url,evidenceUrl:url,title,publisher,version,section,reviewedAt:'2026-10-23',description:section});
export const linuxSources={
 linuxShell:doc('https://man7.org/linux/man-pages/man1/bash.1.html','Bash manual','Free Software Foundation · Brian Fox and Chet Ramey','Bash manual · rendered by man7 · accessed 2026-10-23','Quoting; pipelines; redirection; exit status; job control'),
 linuxInode:doc('https://man7.org/linux/man-pages/man7/inode.7.html','inode(7)','Linux man-pages project','Linux man-pages · accessed 2026-10-23','Metadata; file types; permission bits'),
 linuxSignals:doc('https://man7.org/linux/man-pages/man7/signal.7.html','signal(7)','Linux man-pages project','Linux man-pages · accessed 2026-10-23','Signal dispositions; SIGTERM; SIGKILL; SIGSTOP'),
 linuxGrep:doc('https://man7.org/linux/man-pages/man1/grep.1.html','grep(1)','GNU grep authors · Free Software Foundation','GNU manual · rendered by man7 · accessed 2026-10-23','Fixed strings; standard input; exit status'),
 linuxSystemctl:doc('https://www.freedesktop.org/software/systemd/man/latest/systemctl.html','systemctl','systemd project','systemd 262','Unit introspection; list-units; start versus enable'),
 linuxJournal:doc('https://www.freedesktop.org/software/systemd/man/latest/journalctl.html','journalctl','systemd project','systemd 262','Description; --user; --boot; --unit; --lines; --no-pager'),
 linuxRun:{...doc('https://www.freedesktop.org/software/systemd/man/latest/systemd-run.html','systemd-run','systemd project','systemd 262; live lab tested separately','Description; --user; --unit; --wait; transient service exit status'),reviewedAt:'2026-10-25'},
 linuxCopy:doc('https://github.com/coreutils/coreutils/blob/master/doc/coreutils.texi','Copy files and directories','GNU Project · Free Software Foundation','Living source · accessed 2026-10-23','cp invocation; independent copy; recursive copy'),
 linuxCompare:doc('https://man7.org/linux/man-pages/man1/cmp.1.html','cmp(1)','GNU diffutils authors · Free Software Foundation','GNU manual · rendered by man7 · accessed 2026-10-23','Byte comparison; -s; exit statuses 0, 1, 2'),
};
