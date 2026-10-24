import type {Source} from './content.ts';
const doc=(path:string,title:string,section:string):Source=>({url:`https://docs.python.org/3.12/${path}`,evidenceUrl:`https://docs.python.org/3.12/${path}`,title,publisher:'Python Software Foundation',version:'Python 3.12.15 documentation · examples compatible with Python 3.12+',section,reviewedAt:'2026-10-24',description:section});
export const pythonSources={
 pythonEnvironment:doc('library/venv.html','venv · Virtual environments','Creating virtual environments; interpreter paths; isolation of installed packages'),
 pythonSetup:doc('tutorial/venv.html','Virtual environments and packages','12.1–12.2 · project environments; selected interpreter version'),
 pythonValues:doc('tutorial/introduction.html','An informal introduction to Python','3.1 · numbers; strings; lists; assignment'),
 pythonFlow:doc('tutorial/controlflow.html','More control flow tools','4.1–4.3; 4.8–4.9 · if; for; range; functions; mutable defaults'),
 pythonCollections:doc('tutorial/datastructures.html','Data structures','5.1; 5.4–5.6 · list mutation; sets; dictionaries; iteration'),
 pythonTypes:doc('library/stdtypes.html','Built-in types','Truth value testing; boolean as an integer subtype; sequence and mapping operations'),
 pythonHints:doc('library/typing.html','Support for type hints','Runtime does not enforce annotations; supported annotation syntax'),
 pythonFiles:doc('tutorial/inputoutput.html','Input and output','7.1–7.2 · f-strings; UTF-8; file modes; context management'),
 pythonPaths:doc('library/pathlib.html','Object-oriented filesystem paths','Path; read_text; write_text; file closure and overwrite behaviour'),
 pythonJson:doc('library/json.html','JSON encoder and decoder','loads; JSONDecodeError; conversion table; untrusted input resource limits'),
 pythonErrors:doc('tutorial/errors.html','Errors and exceptions','8.1–8.4 · syntax errors; selected exception handlers; raising exceptions'),
 pythonModules:doc('tutorial/modules.html','Modules','6.1–6.1.2 · module files; imports; __main__; search path'),
 pythonTests:doc('library/unittest.html','Unit testing framework','Basic example; TestCase; assertEqual; assertRaises; unittest.main'),
 pythonCli:doc('library/argparse.html','Command-line argument parsing','ArgumentParser; add_argument; parse_args; error; help and usage'),
};
