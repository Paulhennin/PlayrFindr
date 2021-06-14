const bcrypt = require('bcrypt');
const jwt = require ('../services/jwt');
const UserModel = require ('../models/userModel');


module.exports = {
    async register (req, res) {
        try {

            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const password = req.body.password;
            const birthdate = req.body.birthdate;
            const department_id = req.body.department_id;
            const theme_id = req.body.theme_id;
            const category_id = req.body.category_id;
            const is_admin = req.body.is_admin;
            
            if(firstname === null || lastname === null || email === null || password === null || birthdate === null || theme_id === null || category_id === null) {
                return res.statut(400).json({error : "Arguments missing"});
            }

            if(password !== req.body.passwordConfirm) {
                return res.json({
                  error: "La confirmation du mot de passe ne correspond pas."
                });
              }

              const salt = await bcrypt.genSalt(10);
              const encryptedPassword = await bcrypt.hash(req.body.password, salt);
              
              const user = new UserModel({
                firstname,
                lastname,
                email,
                password: encryptedPassword,
                birthdate,
                department_id,
                theme_id,
                category_id,
                is_admin});
                
                await user.insert();
                
                return res.json({data: user})
        } catch (error) {
            console.trace(error);

            if (error.code == '23505') {
                error = `This resource already exists.`;
            } else {
                error = `A server error occured, please retry later.`;
            }
            res.json({ error });
        }
    },

    async login (req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            

        if(email == null || password == null){
            return res.status(400).json({error: "Arguments missing"})
        }

        const user = await UserModel.findOne(email);

            if(!user){
            
                return res.status(400).json({error : 'This resource doesn"t exists.'})
            }

        const validPwd = await bcrypt.compare(password, user.password);

        if (!validPwd) {
            return res.json({
          error: "Ce n'est pas le bon mot de passe."
            });
        }
        

        if(validPwd){
            return res.status(200).json({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                birthdate: user.birthdate,
                picture: user.picture,
                department_number: user.number,
                department_label: user.label,
                token: jwt.generateTokenForUser(user)
            })
        }
        } catch (error) {
            console.trace(error);
                error = `A server error occured, please retry later.`;
                response.json({ error });
        }
        
    },
    async getOneProfil(req, res, next){
        try {   
            
            const user = await UserModel.findOneProfil(req.params.id);

            if(!user){
                return next();
            }
         
            res.status(200).json({ 
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                birthdate: user.birthdate,
                picture: user.picture,
                game: user.game,
                theme: user.theme,
                category: user.category,
                department: user.department
            })
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry later.`;
            response.json({ error });
        }
    },

    async updateProfil(req, res) {
        try {
            const user = await UserModel.findByPk(req.params.id);
            
            if (!user) {
                return next();
            }

            user.data = req.body;
            
            await user.update();
            
            res.json({ data: user.dataValues });
        } catch (error) {
            console.trace(error);
            if(error.code == '23503'){
                error = 'Department not found'
            } else{
                error = `A server error occured, please retry later.`;
            }

            response.json({ error });
        }
    },
    async deleteProfil(req, res, next){
        try {
            const user = await UserModel.findByPk(req.params.id);

            if(!user){
                return next();
            }

            await user.delete();

            return res.json({data: user});
        } catch (error) {
            console.trace(error);
            response.json({ error });
        }
    },
    async getOneCollection(req, res, next){
        try {
            const user = await UserModel.findCollection(req.params.id);

            if(!user){
                return res.json({error: 'Votre collection est vide'});
            }
            
            return res.json({data: user});
        } catch (error) {
            console.trace(error);
            response.json({ error });
        }
    }
};