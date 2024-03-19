const isLogged = (req, res, next) => {
    if (req.session.isLogged){
        next();
    } else {
        res.status(401).render('error', {message: "Vous devez être connecté pour accéder à cette page"});
    }
};

export default isLogged;