const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!["793350747756429373", "793350767176187904"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
let tag = "⛧"
const kayıtlı = message.guild.roles.cache.find(r => r.id === '793350784858324993')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '793350785958019102')

if(!kayıtlı) return message.reply('**Kayıtlı Rolü Ayarlanmamış.**') 
if(!kayıtsız) return message.reply('**Kayıtsız Rolü Ayarlanmamış.**') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('**Kimi Kayıt Etmem Gerekiyor ?**')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('')
if(!yas) return message.reply('')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`erkekUye.${message.author.id}`, 1)
let erkek = db.get(`erkekUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(`<a:tanri:793345069100564480> Kayıt Eden:`, `<@${message.author.id}> `) 
    .addField(`<a:tanri:793345069100564480> Kayıt Edilen:`, `<@${stg.user.id}> `)
    .addField(`<a:tanri:793345069100564480> Verilen Rol:`, `<@&${kayıtlı.id}> `) 
    .addField(`<a:tanri:793345069100564480> Alınan Rol:`, `<@&${kayıtsız.id}> `)
    .addField(`<a:tanri:793345069100564480> Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` `) 
    .addField(`<a:tanri:793345069100564480> Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
.setFooter(`Quato`)
.setColor('GREEN')
client.channels.cache.get('793350932631912448').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'e',
};