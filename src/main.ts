import express, { NextFunction, Request, Response, Router } from 'express';
require('dotenv').config();

const app = express();
const tareasRoutes = Router();
const tareasBuscar = Router();
let lista: string[];

lista = ['Escribir', 'Estudiar'];

app.get('/', (req: Request, res: Response) => {
	res.send(
		'Hola, ¿Quieres ver las tareas? => ' +
			"<a href='/tareas'>" +
			'ir a tareas' +
			'</a>'
	);
});

tareasRoutes.get('/', (req: Request, res: Response) => {
	res.send(lista);
});

//para que funcione en el navegador o curl
tareasRoutes.get('/:param', (req: Request, res: Response) => {
	const { param } = req.params;
	lista.push(`${param}`);
	//console.info(lista);
	res.status(201).send(lista);
});

//funciona en postman
tareasRoutes.post('/:param', (req: Request, res: Response) => {
	const { param } = req.params;
	lista.push(`${param}`);
	console.info(lista);
	res.status(201).send(lista);
});

//
tareasBuscar.get('/:palabra', (req: Request, res: Response) => {
	const { palabra } = req.params;
	const result = lista.filter(valor => valor == palabra);
	console.info(result);
	res.status(201).send(result);
});

app.use('/tareas', tareasRoutes);
app.use('/search', tareasBuscar);

process.env.PORT
	? console.log('localhost:' + process.env.PORT)
	: console.log('localhost:3000');

app.listen(Number(process.env.PORT) || 3000);
