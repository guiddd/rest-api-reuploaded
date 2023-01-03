import { Request, Response } from "express";

import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ msg: "No existe ese usuario" });
  }
};

//crear usuario
export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    //responsible for looking existent email
    const mailConfirmation = await User.findOne({
      where: {
        email: body.email,
      }
    });
    if (mailConfirmation) {
      res.status(409).json({ msg: "Mail already registered " + body.email });
    }else if (!body.email.trim() || !body.name.trim()){
      res.status(400).json({msg:"Missing content"})
    } else {
      //https://sequelize.org/docs/v6/core-concepts/model-instances/
      const user = User.build(body);
      await user.save();

      res.json({ msg: user });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Revise the error" });
  }
};

//actualizar usuario
export const putUser = async(req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try{
    //se fiaje que la id en la q estamos exista
    const user = await User.findByPk(id);
    if (user){
      if(body.email){
        const emailRepeat = await User.findOne({where:{
          id: id,
          email:body.email
          }});
        const emailConfirmation = await User.findOne({where:{email:body.email}})
        if (!emailRepeat && emailConfirmation){
          console.log(emailConfirmation)
          return res.status(400).json({msg:'Mail ya registrado'})
        } 
      }
        await user.update(body)
        .then(()=>res.json(user));
    }else{
        return res.status(404).json({msg:'No existe un usuario con ese id ' + id});
    }
  }catch(err){
    console.log(err)
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try{
    const user = await User.findByPk(id);
    if (user){
      user.destroy().then(()=>res.json(user));
    }
    else return res.status(404).json({msg:'No existe el usuario'})
  }catch(err){
    console.log(err);
  }
};
