import Vue from 'vue'
import 'buefy/dist/buefy.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import {
    faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload,
    faCalendarAlt, faEnvelope, faLock
} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(
    faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload,
    faCalendarAlt, faEnvelope, faLock
)

Vue.component('vue-fontawesome', FontAwesomeIcon)

export default {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas',
}