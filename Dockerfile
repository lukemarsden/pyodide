FROM pyodide/pyodide-env:20220525-py310-chrome102-firefox100
RUN mkdir /app
ADD n.js /app/
ADD foo.py /app/
ADD pyodide /app/pyodide
ADD node_modules /app/node_modules
WORKDIR /app
ENTRYPOINT ["node", "n.js"]
