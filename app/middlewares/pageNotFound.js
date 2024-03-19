const pageNotFound = (req, res, next) => {
    res.status(404).render('error', { message: "Erreur 404 - La page demandée n'existe pas."});
    next();
};

export default pageNotFound;