"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({ users });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user) {
        res.json({ user });
    }
    else {
        res.status(404).json({ msg: "No existe ese usuario" });
    }
});
exports.getUser = getUser;
//crear usuario
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //responsible for looking existent email
        const mailConfirmation = yield user_1.default.findOne({
            where: {
                email: body.email,
            }
        });
        if (mailConfirmation) {
            res.status(409).json({ msg: "Mail already registered " + body.email });
        }
        else if (!body.email.trim() || !body.name.trim()) {
            res.status(400).json({ msg: "Missing content" });
        }
        else {
            //https://sequelize.org/docs/v6/core-concepts/model-instances/
            const user = user_1.default.build(body);
            yield user.save();
            res.json({ msg: user });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Revise the error" });
    }
});
exports.postUser = postUser;
//actualizar usuario
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        //se fiaje que la id en la q estamos exista
        const user = yield user_1.default.findByPk(id);
        if (user) {
            if (body.email) {
                const emailRepeat = yield user_1.default.findOne({ where: {
                        id: id,
                        email: body.email
                    } });
                const emailConfirmation = yield user_1.default.findOne({ where: { email: body.email } });
                if (!emailRepeat && emailConfirmation) {
                    console.log(emailConfirmation);
                    return res.status(400).json({ msg: 'Mail ya registrado' });
                }
            }
            yield user.update(body)
                .then(() => res.json(user));
        }
        else {
            return res.status(404).json({ msg: 'No existe un usuario con ese id ' + id });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            user.destroy().then(() => res.json(user));
        }
        else
            return res.status(404).json({ msg: 'No existe el usuario' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map