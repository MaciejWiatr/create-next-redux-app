#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var exec = require("child_process").exec;
var path = require("path");
var fs = require("fs");
var cliPath = process.cwd();
var projectName = process.argv[2];
var projectPath = path.join(process.cwd(), projectName);
var srcPath = path.join(projectPath, "/src/");
var featuresPath = path.join(srcPath, "/features");
var featuresCounterPath = path.join(srcPath, "/features/counter/");
var appPath = path.join(srcPath, "/app/");
var pagesPath = path.join(projectPath, "/pages/");
var reduxPagesPath = path.join(projectPath, "/pages/redux");
var filesPath = path.join(__dirname, "/files/");
var componentsPath = path.join(projectPath, "/components/");
var componentsCounterPath = path.join(projectPath, "/components/Counter/");
var ora = require("ora");
function execPromise(command) {
    return new Promise(function (resolve, reject) {
        exec(command, function (error, stdout, stderr) {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}
var sh = function (command, printOutput) {
    if (printOutput === void 0) { printOutput = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, execPromise(command)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    if (printOutput) {
                        console.log(err_1);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var makeDirs = function (dirs) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        dirs.forEach(function (dir) { return __awaiter(_this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.mkdir(dir)];
                    case 1:
                        _a.sent();
                        console.log("created dir " + dir);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log("Dir " + dir + " was already existing, skipping");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
function cp(source, target) {
    return __awaiter(this, void 0, void 0, function () {
        var rd, wr, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rd = fs.createReadStream(source);
                    wr = fs.createWriteStream(target);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            rd.on("error", reject);
                            wr.on("error", reject);
                            wr.on("finish", resolve);
                            rd.pipe(wr);
                            console.log("Copied " + source + " \n");
                        })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_1 = _a.sent();
                    rd.destroy();
                    wr.end();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var getFilePath = function (filename) { return path.join(filesPath, filename); };
var editPackageName = function () { return __awaiter(_this, void 0, void 0, function () {
    var packageFile, file;
    return __generator(this, function (_a) {
        packageFile = path.join(projectPath, "package.json");
        file = require(packageFile);
        file.name = projectName;
        fs.writeFile(packageFile, JSON.stringify(file), function writeJSON(err) {
            if (err)
                return console.log(err);
            console.log("writing to " + packageFile + "\n");
        });
        return [2 /*return*/];
    });
}); };
var copyFiles = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cp(getFilePath("store.js"), path.join(appPath, "store.js"))];
            case 1:
                _a.sent();
                return [4 /*yield*/, cp(getFilePath("Counter.js"), path.join(componentsCounterPath, "index.js"))];
            case 2:
                _a.sent();
                return [4 /*yield*/, cp(getFilePath("Counter.module.css"), path.join(componentsCounterPath, "Counter.module.css"))];
            case 3:
                _a.sent();
                return [4 /*yield*/, cp(getFilePath("counterSlice.js"), path.join(featuresCounterPath, "counterSlice.js"))];
            case 4:
                _a.sent();
                return [4 /*yield*/, cp(getFilePath("_app.js"), path.join(projectPath, "/pages/_app.js"))];
            case 5:
                _a.sent();
                return [4 /*yield*/, cp(getFilePath("index.js"), path.join(projectPath, "/pages/index.js"))];
            case 6:
                _a.sent();
                return [4 /*yield*/, cp(getFilePath("package.json"), path.join(projectPath, "package.json"))];
            case 7:
                _a.sent();
                console.log("Editing package.json \n");
                return [4 /*yield*/, editPackageName()];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// console.log(process.argv[1]);
var spinner = ora("Creating new next app").start();
sh("npx create-next-app " + projectName).then(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spinner.text = "Created new nextjs app in " + projectPath;
                spinner.text = "Creating app structure";
                return [4 /*yield*/, makeDirs([
                        srcPath,
                        componentsPath,
                        featuresPath,
                        appPath,
                        componentsCounterPath,
                        featuresCounterPath,
                    ]).then(function () {
                        spinner.text = "Copying files...";
                        copyFiles().then(function () {
                            spinner.color = "green";
                            spinner.text = "Running npm install...";
                            process.chdir(projectPath);
                            sh("npm install")
                                .then(function (err) {
                                spinner.stop();
                            })["catch"](function (err) {
                                console.log("An error ocured " + err);
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
