import { Router,Request,Response } from "express";
import * as clienteController from "../controllers/clienteController";
import * as homeController from "../controllers/homeController";
import * as calendarioController from "../controllers/calendarioController";



const router = Router();


router.get('/',homeController.home);

router.get("/addcliente",clienteController.clienteAddGet);
router.post("/novocliente",clienteController.clienteAddPost);

router.get("/vizualizarclientes",clienteController.vizualizarCliente);

router.get("/cliente/:id",clienteController.paginaCliente);
router.get("/editarcliente/:id",clienteController.editarclienteGet);
router.post("/clienteeditado/:id",clienteController.editarClientePost);

router.get("/deletarcliente/:id",clienteController.deletarcliente);

router.get("/calendario",calendarioController.calendario);

router.get("/clienteaddprocesso/:id",clienteController.addProcessoGet);
router.post("/clientenovoprocesso/:id",clienteController.addProcessoPost);

router.get("/editarprocesso/:id",clienteController.editarProcessoGet);
router.post("/processoeditado/:id",clienteController.editarProcessoPost);

router.get("/errocadastro",clienteController.showCpfResgisterError);




 


export default router;