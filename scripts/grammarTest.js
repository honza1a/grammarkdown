const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const tests = path.resolve(__dirname, "../src/__tests__");
class Transformer {
    process(content, filename, config, options) {
        let file = parseTestFile(content);
        let result = "";
        if (file.options.full === "true") {
            file = {
                ...file,
                options: {
                    tokens: "true",
                    nodes: "true",
                    diagnostics: "true",
                    emit: "ecmarkup,html,markdown",
                    ...file.options
                }
            };
        }
        if (file.options.tokens === "true") result += scanner;
        if (file.options.nodes === "true") result += parser;
        if (file.options.diagnostics !== "false") result += checker;
        defineEmitterTests();
        return result ? `${header(file, filename, resolve)}\n${result}` : todo(filename);
        function defineEmitterTests() {
            const { emit = "ecmarkup" } = file.options;
            if (emit === "none") return;
            const modes = emit.split(/\s*,\s*|\s+/g);
            for (const mode of modes) {
                result += emitter(mode);
            }
        }
        function resolve(file) {
            file = path.resolve(tests, file);
            file = path.relative(path.dirname(filename), file);
            if (!path.isAbsolute(file) && !file.startsWith(".")) file = "./" + file;
            if (file.endsWith("..")) file += "/../resources";
            file = file.replace(/\\/g, "/");
            return JSON.stringify(file);
        }
    }
    getCacheKey(content, filename, config, options) {
        return crypto
            .createHash("SHA1")
            .update(content, "utf8")
            .update(filename, "utf8")
            .digest()
            .toString("base64");
    }
}

module.exports = {
    process(...args) { return new Transformer().process(...args); },
    getCacheKey(...args) { return new Transformer().getCacheKey(...args); },
    createTransformer() { return new Transformer(); }
};

const nonOptionLineRegExp = /(^|\r?\n)(?!\/\/\s*@)/;

function getOffsetToFirstNonOptionLine(text) {
    const match = nonOptionLineRegExp.exec(text);
    return match ? match.index + match[1].length : text.length;
}

const optionLineRegExp = /^\/\/\s*@\s*(\w+)\s*:\s*(.*?)\s*$/gm;

/**
 * @param {string} content
 */
function parseTestFile(content) {
    const offset = getOffsetToFirstNonOptionLine(content);
    const optionContent = content.slice(0, offset);
    /** @type {Record<string, string>} */
    const options = {};
    for (let match = optionLineRegExp.exec(optionContent); match; match = optionLineRegExp.exec(optionContent)) {
        options[match[1]] = match[2];
    }
    const nonOptionContent = content.slice(offset);
    return { options, content: nonOptionContent };
}

const todo = filename => `
    it.todo(${JSON.stringify(path.relative(tests, filename))});`;

const header = (file, filename, resolve) => `
    // Auto-generated by scripts/grammarTest.js
    const { TestFileHost } = require(${resolve("./resources")});
    const { SourceFile } = require(${resolve("../nodes")});
    const { DiagnosticMessages } = require(${resolve("../diagnostics")});
    const { Scanner } = require(${resolve("../scanner")});
    const { Parser } = require(${resolve("../parser")});
    const { Grammar } = require(${resolve("../grammar")});
    const { writeTokens, compareBaseline, writeNodes, writeDiagnostics, writeOutput } = require(${resolve("./diff")});
    const { EmitFormat, NewLineKind } = require(${resolve("../options")});
    const file = ${JSON.stringify({ ...file, filename })};`

const scanner = `
    it("tokens", () => {
        const sourceFile = new SourceFile(file.filename, file.content, []);
        const diagnostics = new DiagnosticMessages();
        diagnostics.setSourceFile(sourceFile);
        const scanner = new Scanner(file.filename, file.content, diagnostics);
        compareBaseline(writeTokens(file.filename, scanner, sourceFile.lineMap));
    });`;

const parser = `
    it("parse tree", () => {
        const parser = new Parser();
        const sourceFile = parser.parseSourceFile(file.filename, file.content);
        compareBaseline(writeNodes(file.filename, sourceFile));
    });`;

const checker = `
    it("diagnostics", async () => {
        const grammar = new Grammar([file.filename], { newLine: NewLineKind.CarriageReturnLineFeed }, new TestFileHost(file));
        await grammar.check(/*sourceFile*/ undefined);
        compareBaseline(writeDiagnostics(file.filename, grammar.diagnostics));
    });`;

const emitter = (mode) => `
    (() => {
        const mode = ${JSON.stringify(mode)};
        const format = mode === "html" ? EmitFormat.html : mode === "markdown" ? EmitFormat.markdown : EmitFormat.ecmarkup;
        const extname = mode === "html" ? ".html" : mode === "markdown" ? ".md" : ".emu.html";
        const emitLinks = mode === "html";
        it(\`emit \${EmitFormat[format]}\`, async () => {
            let output;
            const grammar = new Grammar([file.filename], { format, emitLinks, newLine: NewLineKind.CarriageReturnLineFeed }, new TestFileHost(file));
            await grammar.emit(/*sourceFile*/ undefined, async (_, _output) => { output = _output; });
            compareBaseline(writeOutput(file.filename, extname, output));
        });
    })();`;