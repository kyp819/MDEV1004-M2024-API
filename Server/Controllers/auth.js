"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessesLogout = exports.ProcessLogin = exports.ProcessRegistration = void 0;
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../Models/user"));
function ProcessRegistration(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            console.error("All Fields are Required");
            return res.status(400).json({ success: false, msg: "ERROR: User not registered. All Fields are Required", data: null });
        }
        if (err) {
            console.error("ERROR: Inserting New User");
            if (err.name == "UserExistsError") {
                console.error("ERROR: User already exists");
            }
            return res.status(400).json({ success: false, msg: "ERROR: User not registered", data: null });
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.json({ success: true, msg: "User Logged in successfully", data: newUser });
        });
    });
}
exports.ProcessRegistration = ProcessRegistration;
function ProcessLogin(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ success: false, msg: "ERROR: Server Error", data: null });
        }
        if (!user) {
            console.error("Login Error: User Credentials_Error or User Not Found");
            return res.status(400).json({ success: false, msg: "ERROR: Login Error", data: null });
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ success: false, msg: "ERROR: Database Error", data: null });
            }
            return res.json({ success: true, msg: "User Logged in successfully", data: user });
        });
    })(req, res, next);
}
exports.ProcessLogin = ProcessLogin;
function ProcessesLogout(req, res, next) {
    req.logOut(() => {
        return res.json({ success: true, msg: "User loggedout successfully", data: null });
    });
}
exports.ProcessesLogout = ProcessesLogout;
//# sourceMappingURL=auth.js.map