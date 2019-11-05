/**
 * File app/helpers.js
 *
 * Ce fichier contient les outils utiles
 * au bon fonctionnement de l'app
 *
 * @author sofianeakbly
 **/


import moment from 'moment'
import date   from 'moment-timezone'

let helpers = {}

helpers.twoDigits = (n) => parseInt(n) < 10 ? '0' + parseInt(n) : parseInt(n);

helpers.moment = (d = null, format = null) => {
  date.locale('fr')
  return d === null ? moment() : format === null ? moment(d) : moment(d, format)
}

helpers.clone = (object) => JSON.parse(JSON.stringify(object));


export default helpers

