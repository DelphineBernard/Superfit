const saveUserData = (req, res, next) => {
    if (req.session.isLogged){
        res.locals.user = req.session.user
        if (req.session.isAdmin){
            res.locals.role="Administrateur"
        } else {
            res.locals.role="Utilisateur"
        }
    }
    next();
}

export default saveUserData;