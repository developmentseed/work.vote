'use strict';
const merge = require('lodash.merge');
/*
 * App configuration.
 *
 * Any properties from config/production.js or config/local.js overrides
 * properties set in this file.
 *
 * This file should not be modified.  Instead, modify one of:
 *
 *  - config/production.js
 *      Production settings (base).
 *  - config/local.js
 *      Overrides if local.js exists.
 *      This last file is git ignored, so you can safely change it without
 *      polluting the repo.
 */

let config = {};
let configOverrides;

if (process.env.DS_ENV === 'production') {
  configOverrides = require(`./config/production.js`);
} else if (process.env.DS_ENV === 'staging') {
  configOverrides = require(`./config/staging.js`);
} else {
  configOverrides = require('./config/local.js') || {};
}

let i = 1;
let technologyOptions = [];
while (i < 6) {
  technologyOptions.push({
    value: i, label: i.toString()
  });
  i++;
}

config.apiUrl = 'https://api.workelections.com';
config.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';
config.ageOptions = [
  { value: 0, label: '18 and under' },
  { value: 1, label: '19 to 25' },
  { value: 2, label: '26 to 35' },
  { value: 3, label: '36 to 50' },
  { value: 4, label: '51 to 64' },
  { value: 5, label: '65 and older' }
];

config.languageOptions = [
  { value: 'None', label: 'None' },
  {value: 'Afar', label: 'Afar', native: 'Afar'},
  {value: 'Abkhazian', label: 'Abkhazian', native: 'Аҧсуа'},
  {value: 'Afrikaans', label: 'Afrikaans', native: 'Afrikaans'},
  {value: 'Akan', label: 'Akan', native: 'Akana'},
  {value: 'Amharic', label: 'Amharic', native: 'አማርኛ'},
  {value: 'Aragonese', label: 'Aragonese', native: 'Aragonés'},
  {value: 'Arabic', label: 'Arabic', native: 'العربية',},
  {value: 'Assamese', label: 'Assamese', native: 'অসমীয়া'},
  {value: 'Avar', label: 'Avar', native: 'Авар'},
  {value: 'Aymara', label: 'Aymara', native: 'Aymar'},
  {value: 'Azerbaijani', label: 'Azerbaijani', native: 'Azərbaycanca / آذربايجان'},
  {value: 'Bashkir', label: 'Bashkir', native: 'Башҡорт'},
  {value: 'Belarusian', label: 'Belarusian', native: 'Беларуская'},
  {value: 'Bulgarian', label: 'Bulgarian', native: 'Български'},
  {value: 'Bihari', label: 'Bihari', native: 'भोजपुरी'},
  {value: 'Bislama', label: 'Bislama', native: 'Bislama'},
  {value: 'Bambara', label: 'Bambara', native: 'Bamanankan'},
  {value: 'Bengali', label: 'Bengali', native: 'বাংলা'},
  {value: 'Tibetan', label: 'Tibetan', native: 'བོད་ཡིག / Bod skad'},
  {value: 'Breton', label: 'Breton', native: 'Brezhoneg'},
  {value: 'Bosnian', label: 'Bosnian', native: 'Bosanski'},
  {value: 'Catalan', label: 'Catalan', native: 'Català'},
  {value: 'Chechen', label: 'Chechen', native: 'Нохчийн'},
  {value: 'Chamorro', label: 'Chamorro', native: 'Chamoru'},
  {value: 'Corsican', label: 'Corsican', native: 'Corsu'},
  {value: 'Cree', label: 'Cree', native: 'Nehiyaw'},
  {value: 'Czech', label: 'Czech', native: 'Čeština'},
  {value: 'Welsh', label: 'Welsh', native: 'Cymraeg'},
  {value: 'Danish', label: 'Danish', native: 'Dansk'},
  {value: 'German', label: 'German', native: 'Deutsch'},
  {value: 'Divehi', label: 'Divehi', native: 'ދިވެހިބަސް',},
  {value: 'Dzongkha', label: 'Dzongkha', native: 'ཇོང་ཁ'},
  {value: 'Ewe', label: 'Ewe', native: 'Ɛʋɛ'},
  {value: 'Greek', label: 'Greek', native: 'Ελληνικά'},
  {value: 'English', label: 'English', native: 'English'},
  {value: 'Esperanto', label: 'Esperanto', native: 'Esperanto'},
  {value: 'Spanish', label: 'Spanish', native: 'Español'},
  {value: 'Estonian', label: 'Estonian', native: 'Eesti'},
  {value: 'Basque', label: 'Basque', native: 'Euskara'},
  {value: 'Persian', label: 'Persian', native: 'فارسی',},
  {value: 'Peul', label: 'Peul', native: 'Fulfulde'},
  {value: 'Finnish', label: 'Finnish', native: 'Suomi'},
  {value: 'Fijian', label: 'Fijian', native: 'Na Vosa Vakaviti'},
  {value: 'Faroese', label: 'Faroese', native: 'Føroyskt'},
  {value: 'French', label: 'French', native: 'Français'},
  {value: 'Irish', label: 'Irish', native: 'Gaeilge'},
  {value: 'Scottish Gaelic', value: 'Scolabel Gaelic', native: 'Gàidhlig'},
  {value: 'Galician', label: 'Galician', native: 'Galego'},
  {value: 'Guarani', label: 'Guarani'},
  {value: 'Gujarati', label: 'Gujarati', native: 'ગુજરાતી'},
  {value: 'Manx', label: 'Manx', native: 'Gaelg'},
  {value: 'Hausa', label: 'Hausa', native: 'هَوُسَ',},
  {value: 'Hebrew', label: 'Hebrew', native: 'עברית',},
  {value: 'Hindi', label: 'Hindi', native: 'हिन्दी'},
  {value: 'Hiri Motu', label: 'Hiri Motu', native: 'Hiri Motu'},
  {value: 'Croatian', label: 'Croatian', native: 'Hrvatski'},
  {value: 'Haitian', label: 'Haitian', native: 'Krèyol ayisyen'},
  {value: 'Hungarian', label: 'Hungarian', native: 'Magyar'},
  {value: 'Armenian', label: 'Armenian', native: 'Հայերեն'},
  {value: 'Herero', label: 'Herero', native: 'Otsiherero'},
  {value: 'Interlingua', label: 'Interlingua', native: 'Interlingua'},
  {value: 'Indonesian', label: 'Indonesian', native: 'Bahasa Indonesia'},
  {value: 'Interlingue', label: 'Interlingue', native: 'Interlingue'},
  {value: 'Igbo', label: 'Igbo', native: 'Igbo'},
  {value: 'Sichuan Yi', value: 'Silabel Yi', native: 'ꆇꉙ / 四川彝语'},
  {value: 'Inupiak', label: 'Inupiak', native: 'Iñupiak'},
  {value: 'Ido', label: 'Ido', native: 'Ido'},
  {value: 'Icelandic', label: 'Icelandic', native: 'Íslenska'},
  {value: 'Italian', label: 'Italian', native: 'Italiano'},
  {value: 'Inuktitut', label: 'Inuktitut', native: 'ᐃᓄᒃᑎᑐᑦ'},
  {value: 'Japanese', label: 'Japanese', native: '日本語'},
  {value: 'Javanese', label: 'Javanese', native: 'Basa Jawa'},
  {value: 'Georgian', label: 'Georgian', native: 'ქართული'},
  {value: 'Kongo', label: 'Kongo', native: 'KiKongo'},
  {value: 'Kikuyu', label: 'Kikuyu', native: 'Gĩkũyũ'},
  {value: 'Kuanyama', label: 'Kuanyama', native: 'Kuanyama'},
  {value: 'Kazakh', label: 'Kazakh', native: 'Қазақша'},
  {value: 'Greenlandic', label: 'Greenlandic', native: 'Kalaallisut'},
  {value: 'Cambodian', label: 'Cambodian', native: 'ភាសាខ្មែរ'},
  {value: 'Kannada', label: 'Kannada', native: 'ಕನ್ನಡ'},
  {value: 'Korean', label: 'Korean', native: '한국어'},
  {value: 'Kanuri', label: 'Kanuri', native: 'Kanuri'},
  {value: 'Kashmiri', label: 'Kashmiri', native: 'कश्मीरी / كشميري',},
  {value: 'Kurdish', label: 'Kurdish', native: 'Kurdî / كوردی',},
  {value: 'Komi', label: 'Komi', native: 'Коми'},
  {value: 'Cornish', label: 'Cornish', native: 'Kernewek'},
  {value: 'Kyrgyz', label: 'Kyrgyz', native: 'Кыргызча'},
  {value: 'Latin', label: 'Latin', native: 'Latina'},
  {value: 'Luxembourgish', label: 'Luxembourgish', native: 'Lëtzebuergesch'},
  {value: 'Ganda', label: 'Ganda', native: 'Luganda'},
  {value: 'Limburgian', label: 'Limburgian', native: 'Limburgs'},
  {value: 'Lingala', label: 'Lingala', native: 'Lingála'},
  {value: 'Laotian', label: 'Laotian', native: 'ລາວ / Pha xa lao'},
  {value: 'Lithuanian', label: 'Lithuanian', native: 'Lietuvių'},
  {value: 'Luba-Katanga', label: 'Luba-Katanga', native: 'Tshiluba'},
  {value: 'Latvian', label: 'Latvian', native: 'Latviešu'},
  {value: 'Malagasy', label: 'Malagasy', native: 'Malagasy'},
  {value: 'Marshallese', label: 'Marshallese', native: 'Kajin Majel / Ebon'},
  {value: 'Maori', label: 'Maori', native: 'Māori'},
  {value: 'Macedonian', label: 'Macedonian', native: 'Македонски'},
  {value: 'Malayalam', label: 'Malayalam', native: 'മലയാളം'},
  {value: 'Mongolian', label: 'Mongolian', native: 'Монгол'},
  {value: 'Moldovan', label: 'Moldovan', native: 'Moldovenească'},
  {value: 'Marathi', label: 'Marathi', native: 'मराठी'},
  {value: 'Malay', label: 'Malay', native: 'Bahasa Melayu'},
  {value: 'Maltese', label: 'Maltese', native: 'bil-Malti'},
  {value: 'Burmese', label: 'Burmese', native: 'မြန်မာစာ'},
  {value: 'Nauruan', label: 'Nauruan', native: 'Dorerin Naoero'},
  {value: 'Norwegian Bokmål', value: 'Norwlabel Bokmål', native: 'Norsk bokmål'},
  {value: 'North Ndebele', value: 'label Ndebele', native: 'Sindebele'},
  {value: 'Nepali', label: 'Nepali', native: 'नेपाली'},
  {value: 'Ndonga', label: 'Ndonga', native: 'Oshiwambo'},
  {value: 'Dutch', label: 'Dutch', native: 'Nederlands'},
  {value: 'Norwegian Nynorsk', value: 'Norwlabel Nynorsk', native: 'Norsk nynorsk'},
  {value: 'Norwegian', label: 'Norwegian', native: 'Norsk'},
  {value: 'South Ndebele', value: 'label Ndebele', native: 'isiNdebele'},
  {value: 'Navajo', label: 'Navajo', native: 'Diné bizaad'},
  {value: 'Chichewa', label: 'Chichewa', native: 'Chi-Chewa'},
  {value: 'Occitan', label: 'Occitan', native: 'Occitan'},
  {value: 'Ojibwa', label: 'Ojibwa', native: 'ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin'},
  {value: 'Oromo', label: 'Oromo', native: 'Oromoo'},
  {value: 'Oriya', label: 'Oriya', native: 'ଓଡ଼ିଆ'},
  {value: 'Ossetian / Ossetic', value: 'Osslabel / Ossetic', native: 'Иронау'},
  {value: 'Panjabi / Punjabi', value: 'Palabel / Punjabi', native: 'ਪੰਜਾਬੀ / पंजाबी / پنجابي'},
  {value: 'Pali', label: 'Pali', native: 'Pāli / पाऴि'},
  {value: 'Polish', label: 'Polish', native: 'Polski'},
  {value: 'Pashto', label: 'Pashto', native: 'پښتو',},
  {value: 'Portuguese', label: 'Portuguese', native: 'Português'},
  {value: 'Quechua', label: 'Quechua', native: 'Runa Simi'},
  {value: 'Raeto Romance', value: 'label Romance', native: 'Rumantsch'},
  {value: 'Kirundi', label: 'Kirundi', native: 'Kirundi'},
  {value: 'Romanian', label: 'Romanian', native: 'Română'},
  {value: 'Russian', label: 'Russian', native: 'Русский'},
  {value: 'Rwandi', label: 'Rwandi', native: 'Kinyarwandi'},
  {value: 'Sanskrit', label: 'Sanskrit', native: 'संस्कृतम्'},
  {value: 'Sardinian', label: 'Sardinian', native: 'Sardu'},
  {value: 'Sindhi', label: 'Sindhi', native: 'सिनधि'},
  {value: 'Northern Sami', value: 'Norlabel Sami', native: 'Sámegiella'},
  {value: 'Sango', label: 'Sango', native: 'Sängö'},
  {value: 'Serbo-Croatian', value: 'label-Croatian', native: 'Srpskohrvatski / Српскохрватски'},
  {value: 'Sinhalese', label: 'Sinhalese', native: 'සිංහල'},
  {value: 'Slovak', label: 'Slovak', native: 'Slovenčina'},
  {value: 'Slovenian', label: 'Slovenian', native: 'Slovenščina'},
  {value: 'Samoan', label: 'Samoan', native: 'Gagana Samoa'},
  {value: 'Shona', label: 'Shona', native: 'chiShona'},
  {value: 'Somalia', label: 'Somalia', native: 'Soomaaliga'},
  {value: 'Albanian', label: 'Albanian', native: 'Shqip'},
  {value: 'Serbian', label: 'Serbian', native: 'Српски'},
  {value: 'Swati', label: 'Swati', native: 'SiSwati'},
  {value: 'Southern Sotho', value: 'Soulabel Sotho', native: 'Sesotho'},
  {value: 'Sundanese', label: 'Sundanese', native: 'Basa Sunda'},
  {value: 'Swedish', label: 'Swedish', native: 'Svenska'},
  {value: 'Swahili', label: 'Swahili', native: 'Kiswahili'},
  {value: 'Tamil', label: 'Tamil', native: 'தமிழ்'},
  {value: 'Telugu', label: 'Telugu', native: 'తెలుగు'},
  {value: 'Tajik', label: 'Tajik', native: 'Тоҷикӣ'},
  {value: 'Thai', label: 'Thai', native: 'ไทย / Phasa Thai'},
  {value: 'Tigrinya', label: 'Tigrinya', native: 'ትግርኛ'},
  {value: 'Turkmen', label: 'Turkmen', native: 'Туркмен / تركمن'},
  {value: 'Tagalog / Filipino', value: 'Talabel / Filipino', native: 'Tagalog'},
  {value: 'Tswana', label: 'Tswana', native: 'Setswana'},
  {value: 'Tonga', label: 'Tonga', native: 'Lea Faka-Tonga'},
  {value: 'Turkish', label: 'Turkish', native: 'Türkçe'},
  {value: 'Tsonga', label: 'Tsonga', native: 'Xitsonga'},
  {value: 'Tatar', label: 'Tatar', native: 'Tatarça'},
  {value: 'Twi', label: 'Twi', native: 'Twi'},
  {value: 'Tahitian', label: 'Tahitian', native: 'Reo Mā`ohi'},
  {value: 'Uyghur', label: 'Uyghur', native: 'Uyƣurqə / ئۇيغۇرچە'},
  {value: 'Ukrainian', label: 'Ukrainian', native: 'Українська'},
  {value: 'Urdu', label: 'Urdu', native: 'اردو',},
  {value: 'Uzbek', label: 'Uzbek', native: 'Ўзбек'},
  {value: 'Venda', label: 'Venda', native: 'Tshivenḓa'},
  {value: 'Vietnamese', label: 'Vietnamese', native: 'Tiếng Việt'},
  {value: 'Volapük', label: 'Volapük', native: 'Volapük'},
  {value: 'Walloon', label: 'Walloon', native: 'Walon'},
  {value: 'Wolof', label: 'Wolof', native: 'Wollof'},
  {value: 'Xhosa', label: 'Xhosa', native: 'isiXhosa'},
  {value: 'Yiddish', label: 'Yiddish', native: 'ייִדיש',},
  {value: 'Yoruba', label: 'Yoruba', native: 'Yorùbá'},
  {value: 'Zhuang', label: 'Zhuang', native: 'Cuengh / Tôô / 壮语'},
  {value: 'Chinese', label: 'Chinese', native: '中文'},
  {value: 'Zulu', label: 'Zulu', native: 'isiZulu'},
];

config.ga = 'UA-65976828-4';
config.pixel = '267782117400714';
config.cookieName = 'workelections_com_seen_survey';

config.technologyOptions = technologyOptions;

config = merge(config, configOverrides);

module.exports = config;
