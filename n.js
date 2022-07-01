async function main() {

    // parse commandline argument -c
    // set filename to first commandline argument

    var argv = require('yargs/yargs')(process.argv.slice(2)).argv;

    let programPath = null;
    if (argv._.length == 1) {
        programPath = argv._[0];
    }

    if (programPath === null && !("c" in argv)) {
        console.log("Must specify a program: 'n.js python.py', or an inline command: 'n.js -c \"print(1+1)\"'")
        process.exit(1);
    }
    
    if (programPath !== null && ("c" in argv)) {
        console.log("Can't specify both program path and inline command")
        process.exit(1);
    }

    let program = "";
    if (programPath !== null) {
        // read contents of file programPath
        program = await fs.promises.readFile(programPath, 'utf8');
    }

    if ("c" in argv) {
        program = argv.c;
    }

    // set system stdout to dev null
    // hide "Loading distutils", "Loaded distutils" messages.
    let oldStdoutWrite = process.stdout.write;
    process.stdout.write = function() {};

    let pyodide_pkg = await import("./pyodide/pyodide.js");
    let LOGGING_ON = false;
    let pyodide = await pyodide_pkg.loadPyodide({
      indexURL: "./pyodide/",
      stdout: (s) => {
         if (LOGGING_ON) {
             console.log(s)
         }
      },
      stderr: (s) => {
         if (LOGGING_ON) {
             console.log(s)
         }
      },
    });
    // await pyodide.loadPackage("micropip");

    LOGGING_ON = true;
    process.stdout.write = oldStdoutWrite;
    await pyodide.runPythonAsync(program);

    // TODO: support requirements
    // TODO: expose requirements as a webserver, if needed?

    //     console.log(await pyodide.runPythonAsync(`
    // import micropip
    // micropip.install("pandas")
    // `))

    //     console.log(await pyodide.runPythonAsync(`
    // import pandas
    // from io import StringIO

    // # CSV String with out headers
    // csvString = """Spark,25000,50 Days,2000
    // Pandas,20000,35 Days,1000
    // Java,15000,,800
    // Python,15000,30 Days,500
    // PHP,18000,30 Days,800"""

    // # Convert String into StringIO
    // csvStringIO = StringIO(csvString)
    // import pandas as pd
    // df = pd.read_csv(csvStringIO, sep=",", header=None)
    // print(df)
    // `));

}

main()
