import { Router,Request,Response } from "express";
import * as clienteController from "../controllers/clienteController";
import * as homeController from "../controllers/homeController";
import * as calendarioController from "../controllers/calendarioController";
import * as arquivoController from "../controllers/arquivoController";
import * as multer from "../config/multer";
import * as loginController from "../controllers/loginContoller";
const router = Router();

router.get("/loginerrado",loginController.loginErrado);
router.get("/login",loginController.loginGet);
router.post("/login",loginController.loginPost);
router.get("/logout",loginController.logout);


router.use(loginController.requireAuth);

router.get('/',homeController.home);

router.get("/addcliente",clienteController.clienteAddGet);
router.post("/novocliente",clienteController.clienteAddPost);

router.get("/vizualizarclientes",clienteController.vizualizarCliente);

router.get("/cliente/:id",clienteController.paginaCliente);
router.get("/editarcliente/:id",clienteController.editarclienteGet);
router.post("/clienteeditado/:id",clienteController.editarClientePost);

router.get("/deletarcliente/:id",clienteController.deletarclienteGet);
router.delete("/deletarcliente/:id",clienteController.deletarclientePost);

router.get("/calendario",calendarioController.calendario);

router.get("/clienteaddprocesso/:id",clienteController.addProcessoGet);
router.post("/clientenovoprocesso/:id",clienteController.addProcessoPost);

router.get("/editarprocesso/:id",clienteController.editarProcessoGet);
router.post("/processoeditado/:id",clienteController.editarProcessoPost);

router.get("/errocadastro",clienteController.showCpfResgisterError);

router.get("/arquivosprocessos/:id",arquivoController.showArquivo);

router.get("/uploadarquivo/:id",arquivoController.uploadArquivoGet);
router.post("/uploadnovoarquivo/:id",multer.upload.single("arquivo"),arquivoController.uploadArquivoPost);

router.get("/arquivodelete/:id",arquivoController.arquivoDeleteGet);
router.delete("/arquivodelete/:id",arquivoController.arquivoDeletePost);

 


export default router;