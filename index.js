const mysql = require('mysql')
const express = require('express')
const cors = require("cors");
const path = require("path");
var app = express()
const session = require('express-session');
const bodyParser = require('body-parser')
const multer = require('multer')
var nodemailer = require("nodemailer");
const {readFileSync, writeFileSync } = require('fs');

app.use(cors({
    
    origin : "*",
    methods : ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use("/images",express.static("upload/images"))
app.use("/langue/fr",express.static("assets/locales/fr"))
app.use("/langue/en",express.static("assets/locales/en"))
app.use("/langue/ar",express.static("assets/locales/ar"))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/uploads', express.static('uploads'));

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"bdnc"
})

mysqlConnection.connect((err)=>{
    if(!err)
    console.log("DB connection succede");
    else
        console.log("DB connection failed \n Erro : ", JSON.stringify(err,undefined, 2))
})


app.listen(4000,()=>console.log("Express server  is running at port : 4000"));
// liens reseaux sociaux
app.get("/text-mission",(req,res)=>{
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationAn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAtr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "text_mission_Fr":translationFr.text_mission,
        "text_mission_En":translationAn.text_mission,
        "text_mission_Ar":translationAtr.text_mission,
        
    })
})
app.post("/modifier-lien-reseaux-sociaux",(req,res)=>{
    const {lienFacebook,lienInstagram,lienSnap,lienLinkdin} = req.body
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationEn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationFr.lien_faceBook = lienFacebook
    translationFr.lien_instagram = lienInstagram
    translationFr.lien_snap = lienSnap
    translationFr.lien_linkdin = lienLinkdin

    translationEn.lien_faceBook = lienFacebook
    translationEn.lien_instagram = lienInstagram
    translationEn.lien_snap = lienSnap
    translationEn.lien_linkdin = lienLinkdin

    translationAr.lien_faceBook = lienFacebook
    translationAr.lien_instagram = lienInstagram
    translationAr.lien_snap = lienSnap
    translationAr.lien_linkdin = lienLinkdin

    
    const objectToJsonFr = JSON.stringify(translationFr)
    writeFileSync('./assets/locales/fr/translation.json',objectToJsonFr)
    const objectToJsonEn = JSON.stringify(translationEn)
    writeFileSync('./assets/locales/en/translation.json',objectToJsonEn)
    const objectToJsonAr = JSON.stringify(translationAr)
    writeFileSync('./assets/locales/ar/translation.json',objectToJsonAr)
    res.send("modification réussi")
})

// modifier mission
app.get("/liens-reseau-sociaux",(req,res)=>{
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "lien_faceBook":translationFr.lien_faceBook,
        "lien_instagram":translationFr.lien_instagram,
        "lien_snap":translationFr.lien_snap, 
        "lien_linkdin":translationFr.lien_linkdin,
    })
})
app.post("/modifier-text-mission",(req,res)=>{
    const {textMissionFr,textMissionEn,textMissionAr} = req.body
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationEn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationFr.text_mission = textMissionFr
    translationEn.text_mission = textMissionEn 
    translationAr.text_mission = textMissionAr   
    
    const objectToJsonFr = JSON.stringify(translationFr)
    writeFileSync('./assets/locales/fr/translation.json',objectToJsonFr)
    const objectToJsonEn = JSON.stringify(translationEn)
    writeFileSync('./assets/locales/en/translation.json',objectToJsonEn)
    const objectToJsonAr = JSON.stringify(translationAr)
    writeFileSync('./assets/locales/ar/translation.json',objectToJsonAr)
    res.send("modification réussi")
})

// modifier vision
app.get("/get-text-vision-modifier",(req,res)=>{
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationAn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAtr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "text_vision_Fr":translationFr.text_vision,
        "text_vision_En":translationAn.text_vision,
        "text_vision_Ar":translationAtr.text_vision,
        
    })
})
app.post("/modifier-text-vision",(req,res)=>{
    const {textVisionFr,textVisionEn,textVisionAr} = req.body
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationEn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationFr.text_vision = textVisionFr
    translationEn.text_vision = textVisionEn 
    translationAr.text_vision = textVisionAr   
    
    const objectToJsonFr = JSON.stringify(translationFr)
    writeFileSync('./assets/locales/fr/translation.json',objectToJsonFr)
    const objectToJsonEn = JSON.stringify(translationEn)
    writeFileSync('./assets/locales/en/translation.json',objectToJsonEn)
    const objectToJsonAr = JSON.stringify(translationAr)
    writeFileSync('./assets/locales/ar/translation.json',objectToJsonAr)
    res.send("modification réussi")
})
// modifier mot du direteur
app.get("/mot-directeur",(req,res)=>{
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationAn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAtr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "mot_dg_Fr":translationFr.bio_samba,
        "mot_dg_En":translationAn.bio_samba,
        "mot_dg_Ar":translationAtr.bio_samba,
        
    })
})
app.post("/modifier-mot-directeur",(req,res)=>{
    const {motFr,motEn,motAr} = req.body
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationEn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationFr.bio_samba = motFr
    translationEn.bio_samba = motEn 
    translationAr.bio_samba = motAr   
    
    const objectToJsonFr = JSON.stringify(translationFr)
    writeFileSync('./assets/locales/fr/translation.json',objectToJsonFr)
    const objectToJsonEn = JSON.stringify(translationEn)
    writeFileSync('./assets/locales/en/translation.json',objectToJsonEn)
    const objectToJsonAr = JSON.stringify(translationAr)
    writeFileSync('./assets/locales/ar/translation.json',objectToJsonAr)
    res.send("modification réussi")
})

//modifier text description
app.get("/get-text-description",(req,res)=>{
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationAn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAtr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "text_des_fr":translationFr.description_nc,
        "text_des_en":translationAn.description_nc,
        "text_des_ar":translationAtr.description_nc,
        
        "titre_fr":translationFr.titre1,
        "titre_en":translationAn.titre1,
        "titre_ar":translationAtr.titre1,
    })
})
app.post("/modifier-text-description",(req,res)=>{
    const {titre_fr,titre_en,titre_ar,text_des_fr,text_des_en,text_des_ar} = req.body
    const translationFr = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationEn = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationAr = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationFr.titre1 = titre_fr
    translationEn.titre1 = titre_en
    translationAr.titre1 = titre_ar
    
    translationFr.description_nc = text_des_fr
    translationEn.description_nc = text_des_en
    translationAr.description_nc = text_des_ar 
    
    const objectToJsonFr = JSON.stringify(translationFr)
    writeFileSync('./assets/locales/fr/translation.json',objectToJsonFr)
    const objectToJsonEn = JSON.stringify(translationEn)
    writeFileSync('./assets/locales/en/translation.json',objectToJsonEn)
    const objectToJsonAr = JSON.stringify(translationAr)
    writeFileSync('./assets/locales/ar/translation.json',objectToJsonAr)
    res.send("modification réussi")
})
// modifier compte courant
app.get("/partie-francais-compte-courant",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.cc_partie1,
        "partie2":translationFrancais.cc_partie2,
        "partie3":translationFrancais.cc_partie3,
        "partie4":translationFrancais.cc_partie4,
    })
})
app.get("/partie-anglais-compte-courant",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.cc_partie1,
        "partie2":translationAnglais.cc_partie2,
        "partie3":translationAnglais.cc_partie3,
        "partie4":translationAnglais.cc_partie4,
    })
})
app.get("/partie-arabe-compte-courant",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.cc_partie1,
        "partie2":translationArabe.cc_partie2,
        "partie3":translationArabe.cc_partie3,
        "partie4":translationArabe.cc_partie4,
    })
})
app.post('/modifier/compte-courant-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.cc_partie1 = partie1
    translationFrancais.cc_partie2 = partie2  
    translationFrancais.cc_partie3 = partie3   
    translationFrancais.cc_partie4 = partie4  

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
   
})
app.post('/modifier/compte-courant-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationFrancais.cc_partie1 = partie1
    translationFrancais.cc_partie2 = partie2  
    translationFrancais.cc_partie3 = partie3   
    translationFrancais.cc_partie4 = partie4  

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
   
})

app.post('/modifier/compte-courant-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationFrancais.cc_partie1 = partie1
    translationFrancais.cc_partie2 = partie2  
    translationFrancais.cc_partie3 = partie3   
    translationFrancais.cc_partie4 = partie4  

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
   
})


// modifier compte dépot a terme
app.get("/partie-francais-compte-depot-terme",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.depot_terme1,
        "partie2":translationFrancais.depot_terme2,
        "partie3":translationFrancais.depot_terme3,
        "partie4":translationFrancais.depot_terme4,
        "partie5" :translationFrancais.depot_terme5
    })
})

app.get("/partie-anglais-compte-depot",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.depot_terme1,
        "partie2":translationAnglais.depot_terme2,
        "partie3":translationAnglais.depot_terme3,
        "partie4":translationAnglais.depot_terme4,
        "partie5" :translationAnglais.depot_terme5
    })
})
app.get("/partie-arabe-compte-depot",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.depot_terme1,
        "partie2":translationArabe.depot_terme2,
        "partie3":translationArabe.depot_terme3,
        "partie4":translationArabe.depot_terme4,
        "partie5" :translationArabe.depot_terme5
    })
})
app.post('/modifier/compte-depot-terme-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.depot_terme1 = partie1
    translationFrancais.depot_terme2 = partie2  
    translationFrancais.depot_terme3 = partie3   
    translationFrancais.depot_terme4 = partie4
    translationFrancais.depot_terme5 = partie5   

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
   
})
app.post('/modifier/compte-depot-terme-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationFrancais.depot_terme1 = partie1
    translationFrancais.depot_terme2 = partie2  
    translationFrancais.depot_terme3 = partie3   
    translationFrancais.depot_terme4 = partie4
    translationFrancais.depot_terme5 = partie5  

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
   
})

app.post('/modifier/compte-depot-terme-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationFrancais.depot_terme1 = partie1
    translationFrancais.depot_terme2 = partie2  
    translationFrancais.depot_terme3 = partie3   
    translationFrancais.depot_terme4 = partie4
    translationFrancais.depot_terme5 = partie5  

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
   
})

// modifier compte plan epargne
app.get("/partie-francais-compte-epargn",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.plan_epargne1,
        "partie2":translationFrancais.plan_epargne2,
        "partie3":translationFrancais.plan_epargne3,
        "partie4":translationFrancais.plan_epargne4,
        "partie5" :translationFrancais.plan_epargne5,
        "partie6" : translationFrancais.plan_epargne6
    })
})
app.get("/partie-anglais-compte-epargn",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.plan_epargne1,
        "partie2":translationAnglais.plan_epargne2,
        "partie3":translationAnglais.plan_epargne3,
        "partie4":translationAnglais.plan_epargne4,
        "partie5" :translationAnglais.plan_epargne5,
        "partie6" : translationAnglais.plan_epargne6
    })
})
app.get("/partie-arabe-compte-epargn",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.plan_epargne1,
        "partie2":translationArabe.plan_epargne2,
        "partie3":translationArabe.plan_epargne3,
        "partie4":translationArabe.plan_epargne4,
        "partie5" :translationArabe.plan_epargne5,
        "partie6" : translationArabe.plan_epargne6
    })
})
app.post('/modifier/compte-plan-epargne-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.plan_epargne1 = partie1
    translationFrancais.plan_epargne2 = partie2  
    translationFrancais.plan_epargne3 = partie3   
    translationFrancais.plan_epargne4 = partie4
    translationFrancais.plan_epargne5 = partie5
    translationFrancais.plan_epargne6 = partie6   

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
   
})
app.post('/modifier/compte-plan-epargne-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationFrancais.plan_epargne1 = partie1
    translationFrancais.plan_epargne2 = partie2  
    translationFrancais.plan_epargne3 = partie3   
    translationFrancais.plan_epargne4 = partie4
    translationFrancais.plan_epargne5 = partie5
    translationFrancais.plan_epargne6 = partie6   

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
   
})

app.post('/modifier/compte-plan-epargne-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationFrancais.plan_epargne1 = partie1
    translationFrancais.plan_epargne2 = partie2  
    translationFrancais.plan_epargne3 = partie3   
    translationFrancais.plan_epargne4 = partie4
    translationFrancais.plan_epargne5 = partie5
    translationFrancais.plan_epargne6 = partie6  

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
   
})

// credit mawleny
app.get("/partie-francais-credit-mawleny",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.description1_mewelny,
        "partie2":translationFrancais.description2_mewelny,
        "partie3":translationFrancais.description3_mewelny,
        "partie4":translationFrancais.description4_mewelny,
        "partie5" :translationFrancais.description5_mewelny,
       
    })
})
app.post('/modifier/credit-mawleny-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.description1_mewelny = partie1
    translationFrancais.description2_mewelny = partie2  
    translationFrancais.description3_mewelny = partie3   
    translationFrancais.description4_mewelny = partie4
    translationFrancais.description5_mewelny = partie5
      

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
   
})
app.get("/partie-arabe-credit-mawleny",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.description1_mewelny,
        "partie2":translationArabe.description2_mewelny,
        "partie3":translationArabe.description3_mewelny,
        "partie4":translationArabe.description4_mewelny,
        "partie5":translationArabe.description5_mewelny,
       
    })
})
app.post('/modifier/credit-mawleny-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationArabe.description1_mewelny = partie1
    translationArabe.description2_mewelny = partie2  
    translationArabe.description3_mewelny = partie3   
    translationArabe.description4_mewelny = partie4
    translationArabe.description5_mewelny = partie5
      

    const objectToJson = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
   
})
app.get("/partie-anglais-credit-mawleny",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.description1_mewelny,
        "partie2":translationAnglais.description2_mewelny,
        "partie3":translationAnglais.description3_mewelny,
        "partie4":translationAnglais.description4_mewelny,
        "partie5":translationAnglais.description5_mewelny,
       
    })
})
app.post('/modifier/credit-mawleny-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationAnglais.description1_mewelny = partie1
    translationAnglais.description2_mewelny = partie2  
    translationAnglais.description3_mewelny = partie3   
    translationAnglais.description4_mewelny = partie4
    translationAnglais.description5_mewelny = partie5
      

    const objectToJson = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
   
})
//credit noujoume
app.get("/partie-francais-credit-noujoume",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.description1_noujoune,
        "partie2":translationFrancais.description2_noujoune,
        "partie3":translationFrancais.description3_noujoune,
        "partie4":translationFrancais.description4_noujoune,
        "partie5" :translationFrancais.description5_noujoune,
       
    })
})
app.post('/modifier/credit-noujoume-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.description1_noujoune = partie1
    translationFrancais.description2_noujoune = partie2  
    translationFrancais.description3_noujoune = partie3   
    translationFrancais.description4_noujoune = partie4
    translationFrancais.description5_noujoune = partie5
      

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
   
})
app.get("/partie-arabe-credit-noujoume",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.description1_noujoune,
        "partie2":translationArabe.description2_noujoune,
        "partie3":translationArabe.description3_noujoune,
        "partie4":translationArabe.description4_noujoune,
        "partie5":translationArabe.description5_noujoune,
       
    })
})
app.post('/modifier/credit-noujoume-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationArabe.description1_noujoune = partie1
    translationArabe.description2_noujoune = partie2  
    translationArabe.description3_noujoune = partie3   
    translationArabe.description4_noujoune = partie4
    translationArabe.description5_noujoune = partie5
      
    const objectToJson = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
   
})
app.get("/partie-anglais-credit-noujoume",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.description1_noujoune,
        "partie2":translationAnglais.description2_noujoune,
        "partie3":translationAnglais.description3_noujoune,
        "partie4":translationAnglais.description4_noujoune,
        "partie5":translationAnglais.description5_noujoune,
       
    })
})
app.post('/modifier/credit-noujoume-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationAnglais.description1_noujoune = partie1
    translationAnglais.description2_noujoune = partie2  
    translationAnglais.description3_noujoune = partie3   
    translationAnglais.description4_noujoune = partie4
    translationAnglais.description5_noujoune = partie5
      
    const objectToJson = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
   
})
// credit beyti
app.get("/partie-francais-credit-beyti",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.description1_beyti,
        "partie2":translationFrancais.description2_beyti,
        "partie3":translationFrancais.description3_beyti,
        "partie4":translationFrancais.description4_beyti,
        "partie5" :translationFrancais.description5_beyti,
        "partie6":translationFrancais.description6_beyti,
        "partie7" :translationFrancais.description7_beyti,
       
    })
})
app.post('/modifier/credit-beyti-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.description1_beyti = partie1
    translationFrancais.description2_beyti = partie2  
    translationFrancais.description3_beyti = partie3   
    translationFrancais.description4_beyti = partie4
    translationFrancais.description5_beyti = partie5
    translationFrancais.description6_beyti = partie6
    translationFrancais.description7_beyti = partie7
      

    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-arabe-credit-beyti",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.description1_beyti,
        "partie2":translationArabe.description2_beyti,
        "partie3":translationArabe.description3_beyti,
        "partie4":translationArabe.description4_beyti,
        "partie5":translationArabe.description5_beyti,
        "partie6":translationArabe.description6_beyti,
        "partie7":translationArabe.description7_beyti,
       
    })
})
app.post('/modifier/credit-beyti-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7} = req.body
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationArabe.description1_beyti = partie1
    translationArabe.description2_beyti = partie2  
    translationArabe.description3_beyti = partie3   
    translationArabe.description4_beyti = partie4
    translationArabe.description5_beyti = partie5
    translationArabe.description6_beyti = partie6
    translationArabe.description7_beyti = partie7
      

    const objectToJson = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-anglais-credit-beyti",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.description1_beyti,
        "partie2":translationAnglais.description2_beyti,
        "partie3":translationAnglais.description3_beyti,
        "partie4":translationAnglais.description4_beyti,
        "partie5":translationAnglais.description5_beyti,
        "partie6":translationAnglais.description6_beyti,
        "partie7":translationAnglais.description7_beyti,
       
    })
})
app.post('/modifier/credit-beyti-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7} = req.body
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationAnglais.description1_beyti = partie1
    translationAnglais.description2_beyti = partie2  
    translationAnglais.description3_beyti = partie3   
    translationAnglais.description4_beyti = partie4
    translationAnglais.description5_beyti = partie5
    translationAnglais.description6_beyti = partie6
    translationAnglais.description7_beyti = partie7
      

    const objectToJson = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
})
// credit bidaya 
app.get("/partie-francais-credit-bidaya",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.description1_bidaya,
        "partie2":translationFrancais.description2_bidaya,
        "partie3":translationFrancais.description3_bidaya,
        "partie4":translationFrancais.description4_bidaya,
        "partie5" :translationFrancais.description5_bidaya,
        "partie6":translationFrancais.description6_bidaya,
        "partie7" :translationFrancais.description7_bidaya, 
    })
})
app.post('/modifier/credit-bidaya-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.description1_bidaya = partie1
    translationFrancais.description2_bidaya = partie2  
    translationFrancais.description3_bidaya = partie3   
    translationFrancais.description4_bidaya = partie4
    translationFrancais.description5_bidaya = partie5
    translationFrancais.description6_bidaya = partie6
    translationFrancais.description7_bidaya = partie7
      
    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-arabe-credit-bidaya",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.description1_bidaya,
        "partie2":translationArabe.description2_bidaya,
        "partie3":translationArabe.description3_bidaya,
        "partie4":translationArabe.description4_bidaya,
        "partie5":translationArabe.description5_bidaya,
        "partie6":translationArabe.description6_bidaya,
        "partie7":translationArabe.description7_bidaya, 
    })
})
app.post('/modifier/credit-bidaya-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7} = req.body
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationArabe.description1_bidaya = partie1
    translationArabe.description2_bidaya = partie2  
    translationArabe.description3_bidaya = partie3   
    translationArabe.description4_bidaya = partie4
    translationArabe.description5_bidaya = partie5
    translationArabe.description6_bidaya = partie6
    translationArabe.description7_bidaya = partie7
      
    const objectToJson = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-anglais-credit-bidaya",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.description1_bidaya,
        "partie2":translationAnglais.description2_bidaya,
        "partie3":translationAnglais.description3_bidaya,
        "partie4":translationAnglais.description4_bidaya,
        "partie5":translationAnglais.description5_bidaya,
        "partie6":translationAnglais.description6_bidaya,
        "partie7":translationAnglais.description7_bidaya, 
    })
})
app.post('/modifier/credit-bidaya-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7} = req.body
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationAnglais.description1_bidaya = partie1
    translationAnglais.description2_bidaya = partie2  
    translationAnglais.description3_bidaya = partie3   
    translationAnglais.description4_bidaya = partie4
    translationAnglais.description5_bidaya = partie5
    translationAnglais.description6_bidaya = partie6
    translationAnglais.description7_bidaya = partie7
      
    const objectToJson = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
})
// credit takaful
app.get("/partie-francais-credit-takaful",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.description1_takaful,
        "partie2":translationFrancais.description2_takaful,
        "partie3":translationFrancais.description3_takaful,
        "partie4":translationFrancais.description4_takaful,
        "partie5" :translationFrancais.description5_takaful,
        "partie6":translationFrancais.description6_takaful,
    })
})
app.post('/modifier/credit-takaful-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.description1_takaful = partie1
    translationFrancais.description2_takaful = partie2  
    translationFrancais.description3_takaful = partie3   
    translationFrancais.description4_takaful = partie4
    translationFrancais.description5_takaful = partie5
    translationFrancais.description6_takaful = partie6
  
    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-arabe-credit-takaful",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.description1_takaful,
        "partie2":translationArabe.description2_takaful,
        "partie3":translationArabe.description3_takaful,
        "partie4":translationArabe.description4_takaful,
        "partie5":translationArabe.description5_takaful,
        "partie6":translationArabe.description6_takaful,
    })
})
app.post('/modifier/credit-takaful-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6} = req.body
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationArabe.description1_takaful = partie1
    translationArabe.description2_takaful = partie2  
    translationArabe.description3_takaful = partie3   
    translationArabe.description4_takaful = partie4
    translationArabe.description5_takaful = partie5
    translationArabe.description6_takaful = partie6
  
    const objectToJson = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-anglais-credit-takaful",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.description1_takaful,
        "partie2":translationAnglais.description2_takaful,
        "partie3":translationAnglais.description3_takaful,
        "partie4":translationAnglais.description4_takaful,
        "partie5":translationAnglais.description5_takaful,
        "partie6":translationAnglais.description6_takaful,
    })
})
app.post('/modifier/credit-takaful-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6} = req.body
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationAnglais.description1_takaful = partie1
    translationAnglais.description2_takaful = partie2  
    translationAnglais.description3_takaful = partie3   
    translationAnglais.description4_takaful = partie4
    translationAnglais.description5_takaful = partie5
    translationAnglais.description6_takaful = partie6
  
    const objectToJson = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
})
// credit equipement 
app.get("/partie-francais-credit-equipement-samsung",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.description1_equipement,
        "partie2":translationFrancais.description2_equipement,
        "partie3":translationFrancais.description3_equipement,
        "partie4":translationFrancais.description4_equipement,
        "partie5" :translationFrancais.description5_equipement,
        "partie6":translationFrancais.description6_equipement,
        "partie7" :translationFrancais.description7_equipement,
        "partie8":translationFrancais.description8_equipement,
    })
})
app.post('/modifier/credit-equipement-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7,partie8} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.description1_equipement = partie1
    translationFrancais.description2_equipement = partie2  
    translationFrancais.description3_equipement = partie3   
    translationFrancais.description4_equipement = partie4
    translationFrancais.description5_equipement = partie5
    translationFrancais.description6_equipement = partie6
    translationFrancais.description7_equipement = partie7
    translationFrancais.description8_equipement = partie8
  
    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-arabe-credit-equipement-samsung",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.description1_equipement,
        "partie2":translationArabe.description2_equipement,
        "partie3":translationArabe.description3_equipement,
        "partie4":translationArabe.description4_equipement,
        "partie5":translationArabe.description5_equipement,
        "partie6":translationArabe.description6_equipement,
        "partie7":translationArabe.description7_equipement,
        "partie8":translationArabe.description8_equipement,
    })
})
app.post('/modifier/credit-equipement-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7,partie8} = req.body
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationArabe.description1_equipement = partie1
    translationArabe.description2_equipement = partie2  
    translationArabe.description3_equipement = partie3   
    translationArabe.description4_equipement = partie4
    translationArabe.description5_equipement = partie5
    translationArabe.description6_equipement = partie6
    translationArabe.description7_equipement = partie7
    translationArabe.description8_equipement = partie8
  
    const objectToJson = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-anglais-credit-equipement-samsung",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.description1_equipement,
        "partie2":translationAnglais.description2_equipement,
        "partie3":translationAnglais.description3_equipement,
        "partie4":translationAnglais.description4_equipement,
        "partie5":translationAnglais.description5_equipement,
        "partie6":translationAnglais.description6_equipement,
        "partie7":translationAnglais.description7_equipement,
        "partie8":translationAnglais.description8_equipement,
    })
})
app.post('/modifier/credit-equipement-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5,partie6,partie7,partie8} = req.body
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationAnglais.description1_equipement = partie1
    translationAnglais.description2_equipement = partie2  
    translationAnglais.description3_equipement = partie3   
    translationAnglais.description4_equipement = partie4
    translationAnglais.description5_equipement = partie5
    translationAnglais.description6_equipement = partie6
    translationAnglais.description7_equipement = partie7
    translationAnglais.description8_equipement = partie8
  
    const objectToJson = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
})
// credit avance sur salaire
app.get("/partie-francais-credit-avance-salaire",(req,res)=>{
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    res.send({
        "partie1":translationFrancais.description1_avance_salaire,
        "partie2":translationFrancais.description2_avance_salaire,
        "partie3":translationFrancais.description3_avance_salaire,
        "partie4":translationFrancais.description4_avance_salaire,
        "partie5" :translationFrancais.description5_avance_salaire,
        
    })
})
app.post('/modifier/credit-avance-salaire-francais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    translationFrancais.description1_avance_salaire = partie1
    translationFrancais.description2_avance_salaire = partie2  
    translationFrancais.description3_avance_salaire = partie3   
    translationFrancais.description4_avance_salaire = partie4
    translationFrancais.description5_avance_salaire = partie5
    
  
    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    res.send("modification réussi")
})

app.get("/partie-arabe-credit-avance-salaire",(req,res)=>{
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    res.send({
        "partie1":translationArabe.description1_avance_salaire,
        "partie2":translationArabe.description2_avance_salaire,
        "partie3":translationArabe.description3_avance_salaire,
        "partie4":translationArabe.description4_avance_salaire,
        "partie5":translationArabe.description5_avance_salaire,
        
    })
})
app.post('/modifier/credit-avance-salaire-arabe', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))
    translationArabe.description1_avance_salaire = partie1
    translationArabe.description2_avance_salaire = partie2  
    translationArabe.description3_avance_salaire = partie3   
    translationArabe.description4_avance_salaire = partie4
    translationArabe.description5_avance_salaire = partie5
    
    const objectToJson = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson)
    res.send("modification réussi")
})
app.get("/partie-anglais-credit-avance-salaire",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "partie1":translationAnglais.description1_avance_salaire,
        "partie2":translationAnglais.description2_avance_salaire,
        "partie3":translationAnglais.description3_avance_salaire,
        "partie4":translationAnglais.description4_avance_salaire,
        "partie5":translationAnglais.description5_avance_salaire,
        
    })
})
app.post('/modifier/credit-avance-salaire-anglais', (req,res)=>{
    const {partie1,partie2,partie3,partie4,partie5} = req.body
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    translationAnglais.description1_avance_salaire = partie1
    translationAnglais.description2_avance_salaire = partie2  
    translationAnglais.description3_avance_salaire = partie3   
    translationAnglais.description4_avance_salaire = partie4
    translationAnglais.description5_avance_salaire = partie5
    
    const objectToJson = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson)
    res.send("modification réussi")
})

// numero service
app.get("/get-service-number",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "num1":translationAnglais.num_service_1,
        "num2":translationAnglais.num_service_2,
        "email":translationAnglais.email_service,
        "adresse" : translationAnglais.adresse_service,   
    })
})

app.post('/modifier/service-number', (req,res)=>{
    const {num1,num2,email,adresse} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))

    translationFrancais.num_service_1=num1
    translationFrancais.num_service_2=num2
    translationFrancais.email_service=email
    translationFrancais.adresse_service=adresse

    translationAnglais.num_service_1=num1
    translationAnglais.num_service_2=num2
    translationAnglais.email_service=email 
    translationAnglais.adresse_service=adresse

    translationArabe.num_service_1=num1
    translationArabe.num_service_2=num2 
    translationArabe.email_service=email
    translationArabe.adresse_service=adresse
    
    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    const objectToJson2 = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson2)
    const objectToJson3 = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson3)

    res.send("modification réussi")
})

// numero agants
app.get("/get-agence-number",(req,res)=>{
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    res.send({
        "num_central":translationAnglais.num_agent_central,
        "num_charbon":translationAnglais.num_agent_charbon,
        "num_toujouni":translationAnglais.num_agent_toujouni,
        "num_point_chaud" : translationAnglais.num_agant_point_chaud,
        "num_nouadhibou":translationAnglais.num_agant_nouadhibou,         
    })
})
app.post('/modifier/number-of-agences', (req,res)=>{
    const {num_central,num_charbon,num_toujouni,num_point_chaud,num_nouadhibou} = req.body
    const translationFrancais = JSON.parse(readFileSync('./assets/locales/fr/translation.json', 'utf-8'))
    const translationAnglais = JSON.parse(readFileSync('./assets/locales/en/translation.json', 'utf-8'))
    const translationArabe = JSON.parse(readFileSync('./assets/locales/ar/translation.json', 'utf-8'))

    translationFrancais.num_agent_central=num_central
    translationFrancais.num_agent_charbon=num_charbon
    translationFrancais.num_agent_toujouni=num_toujouni
    translationFrancais.num_agant_point_chaud=num_point_chaud
    translationFrancais.num_agant_nouadhibou=num_nouadhibou

    translationAnglais.num_agent_central=num_central
    translationAnglais.num_agent_charbon=num_charbon
    translationAnglais.num_agent_toujouni=num_toujouni
    translationAnglais.num_agant_point_chaud=num_point_chaud
    translationAnglais.num_agant_nouadhibou=num_nouadhibou

    translationArabe.num_agent_central=num_central
    translationArabe.num_agent_charbon=num_charbon
    translationArabe.num_agent_toujouni=num_toujouni
    translationArabe.num_agant_point_chaud=num_point_chaud
    translationArabe.num_agant_nouadhibou=num_nouadhibou
    
    const objectToJson = JSON.stringify(translationFrancais)
    writeFileSync('./assets/locales/fr/translation.json',objectToJson)
    const objectToJson2 = JSON.stringify(translationAnglais)
    writeFileSync('./assets/locales/en/translation.json',objectToJson2)
    const objectToJson3 = JSON.stringify(translationArabe)
    writeFileSync('./assets/locales/ar/translation.json',objectToJson3)

    res.send("modification réussi")
})
// add user 
app.post('/users/add', (req,res)=>{
    const {login, password } =req.body
    const user = {login,password}
    mysqlConnection.query("INSERT INTO users SET ?",[user],(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})
// http://localhost:3000/auth
app.post('/users/auth', function(request, response) {
	// Capture the input fields
	let login = request.body.login;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (login && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		mysqlConnection.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.login = login;

				response.send(results)
				
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/services', (req,res)=>{
    mysqlConnection.query("SELECT * FROM service",(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})


// get one service 
app.get('/services/:id', (req,res)=>{
    mysqlConnection.query("SELECT * FROM service WHERE id = ?",[req.params.id],(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})

// delete service
app.delete('/services/:id', (req,res)=>{
    mysqlConnection.query("DELETE FROM service WHERE id = ?",[req.params.id],(err,rows,fields)=> {
        if(!err)
            res.send("Deleted successfully")
        else
            console.log(err);
    })
})

// insert service 
app.post('/services', (req,res)=>{
    const {contenu1, titre, contenu2 } =req.body
    const service = {contenu1,titre,contenu2}
    mysqlConnection.query("INSERT INTO service SET ?",[service],(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }
})

  const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
  };

  app.post("/single", upload.single("image"),(req, res) => {
    if (req.file) {
        const url = ""+req.file.filename;
       
        var sql = "INSERT INTO images (url) VALUES ('" + url +"')";
        mysqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
        
      res.send("Single file uploaded successfully");
    } else {
      res.status(400).send("Please upload a valid image");
    }
  });

  // get all images 
  app.get('/api/images', (req,res)=>{
    mysqlConnection.query("SELECT * FROM images",(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})
app.delete('/images/:id', (req,res)=>{
    mysqlConnection.query("DELETE FROM images WHERE id = ?",[req.params.id],(err,rows,fields)=> {
        if(!err)
            res.send("Deleted successfully")
        else
            console.log(err);
    })
})

//   app.post("/multiple", upload.array("images", 5), (req, res) => {
//   if (req.files) {
    
//     res.send("Muliple files uploaded successfully");
//   } else {
//     res.status(400).send("Please upload a valid images");
//   }
// });


// inscription 
app.post('/service/inscription', (req,res)=>{
    const fullName = req.body.fullName
    const email = req.body.email 
    const num_tel = req.body.num_tel 
    const service = req.body.service

    var from = req.body.email
    var to = "contact@nationalcash.mr"
    var subject = "inscription sur un service"
    var message = "Bonjour je veux m'inscrire sur le service : "+ req.body.service + " . Voici mon numéro de téléphone :"+ req.body.num_tel + " et mon email: "+req.body.email

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'bayedieyeba3@gmail.com',
          pass: 'gngjgewuxrrvzrcn'
        }
    })

    var mailOptions = {
        from: from,
        to:to,
        subject:subject,
        text:message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            response.send("votre mail a été bien transmis")
        }
    })

    var sql = "INSERT INTO inscription_service (fullName,email,num_tel,service) VALUES ('" + fullName +"', '" + email +"' ,'" + num_tel +"' ,'" + service +"')";
        mysqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});

res.send("inscription validé avec succès");
   
})