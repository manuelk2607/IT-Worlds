import type {Source} from './content.ts';
const chapter=(file:string,title:string,section:string):Source=>({url:`https://pages.cs.wisc.edu/~remzi/OSTEP/${file}.pdf`,evidenceUrl:`https://pages.cs.wisc.edu/~remzi/OSTEP/${file}.pdf`,title:`Operating Systems: Three Easy Pieces · ${title}`,publisher:'Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau · University of Wisconsin–Madison',version:'OSTEP 1.10 · online chapter accessed 2026-10-24',section,reviewedAt:'2026-10-24',description:section});
export const osSources={
 osProcesses:chapter('cpu-intro','The abstraction: the process','4.1; 4.4–4.5 · program versus process; ready/running/blocked; saved state'),
 osScheduling:chapter('cpu-sched','Scheduling: introduction','7.1; 7.2; 7.6–7.7 · workload assumptions; turnaround/response; Round Robin and quantum'),
 osAddressSpaces:chapter('vm-intro','The abstraction: address spaces','13.3–13.5 · virtual addresses; isolation; translation'),
 osPaging:chapter('vm-paging','Paging: introduction','18.1–18.3 · virtual page numbers; page frames; offset; page-table entries'),
 osThreads:chapter('threads-intro','Concurrency: an introduction','26.1–26.3 · shared address space; per-thread state; uncontrolled interleaving'),
 osLocks:chapter('threads-locks','Locks','28.1–28.3 · critical sections; mutual exclusion; evaluating locks'),
 osFiles:chapter('file-intro','Files and directories','39.1; 39.7; 39.14–39.15 · bytes and names; fsync; hard links; unlink and reference counts'),
 osReplacement:chapter('vm-beyondphys-policy','Beyond physical memory: policies','22.1; 22.3; 22.5 · cache hits/misses; FIFO; Belady anomaly; recency'),
};
