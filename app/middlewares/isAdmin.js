const isAdmin = (req, res, next) => {
    if (req.session.isAdmin){
        next();
    } else {
        res.render('error', {message: "Vous devez être administrateur pour accéder à cette page"})
    }
};

export default isAdmin;