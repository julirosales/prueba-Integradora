function personaLogeada(req, res, next) {
  if (req.session.userLoger) {
    return res.redirect("/user/profile");
  }
  next();
}

//hago este midelware porque si la persona ya se encuentra logeada(que se capta con session) no puedo entrar ni a registrarse ni a logearse nuevamente

module.exports = personaLogeada;
