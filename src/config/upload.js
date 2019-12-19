const multer = require('multer');//para poder salvar as imagens enviadas
const path = require('path');//para caminhos de dados

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),//vai para o endereço ../../uploads/ onde será salvo as imagens
        filename: function(req, file, cb){//cb->callback
            cb(null, file.originalname);//pega o nome original da imagem
        }
    })
};