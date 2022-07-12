# FROM pyodide/pyodide-env:20220525-py310-chrome102-firefox100
FROM pyodide/pyodide-env:20220629-py310-chrome102-firefox100
RUN mkdir /app
ADD pyodide /app/pyodide
ADD node_modules /app/node_modules
ADD n.js /app/
ADD foo.py /app/
WORKDIR /app
ENTRYPOINT ["node", "n.js"]
