async function main() {
    let pyodide_pkg = await import("./pyodide/pyodide.js");
    let pyodide = await pyodide_pkg.loadPyodide({indexURL: "./pyodide/"});
    await pyodide.loadPackage("micropip");

    console.log(await pyodide.runPythonAsync("1+1"));
    console.log(await pyodide.runPythonAsync(`
import micropip
micropip.install("pandas")
`))
    console.log(await pyodide.runPythonAsync(`
import pandas
from io import StringIO

# CSV String with out headers
csvString = """Spark,25000,50 Days,2000
Pandas,20000,35 Days,1000
Java,15000,,800
Python,15000,30 Days,500
PHP,18000,30 Days,800"""

# Convert String into StringIO
csvStringIO = StringIO(csvString)
import pandas as pd
df = pd.read_csv(csvStringIO, sep=",", header=None)
print(df)
`));
}

main()
