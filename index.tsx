
document.addEventListener('DOMContentLoaded', () => {
    type Station = {
        name: string;
        city: string;
        genre: string;
        url: string;
    };

    const radioData: Record<string, Station[]> = {
        "United States": [
            { name: "KCRW Eclectic24", city: "Santa Monica", genre: "Indie", url: "http://kcrw.streamguys1.com/kcrw_eclectic24_128k_mp3" },
            { name: "WNYC-FM", city: "New York", genre: "News/Talk", url: "http://fm939.wnyc.org/wnycfm" },
            { name: "KEXP 90.3 FM", city: "Seattle", genre: "Alternative", url: "http://live-mp3-128.kexp.org/" },
            { name: "Classical KUSC", city: "Los Angeles", genre: "Classical", url: "http://64.202.109.2:80/kusc128" },
            { name: "Jazz24", city: "Seattle", genre: "Jazz", url: "https://d.live.npr.org/streams/jazz24/jazz24/icecast.mp3" },
            { name: "Radio Paradise", city: "Global", genre: "Eclectic Rock", url: "http://stream.radioparadise.com/rock-128" },
            { name: "SomaFM: Groove Salad", city: "San Francisco", genre: "Ambient", url: "http://ice1.somafm.com/groovesalad-128-mp3" },
            { name: "WFMU", city: "Jersey City", genre: "Freeform", url: "http://stream.wfmu.org/freeform-128.mp3" },
            { name: "KPCC", city: "Pasadena", genre: "Public Radio", url: "http://live.scpr.org/kpcclive/" },
            { name: "The Current", city: "Minneapolis", genre: "Adult Alternative", url: "http://current.stream.publicradio.org/kcmp.mp3" },
            { name: "Dublab", city: "Los Angeles", genre: "Electronic", url: "http://dublab.out.airtime.pro:8000/dublab_128" },
            { name: "WWOZ 90.7 FM", city: "New Orleans", genre: "Jazz & Blues", url: "http://wwoz-sc.streamguys.com/wwoz-hi.mp3" },
            { name: "Radio Free Brooklyn", city: "Brooklyn", genre: "Community", url: "http://streaming.radio.co/s754e1a49a/listen" },
            { name: "KUTX 98.9", city: "Austin", genre: "AAA", url: "https://kutx.stream.publicradio.org/kutx.mp3" },
            { name: "Def Con Radio", city: "Las Vegas", genre: "Electronic/Talk", url: "http://ice1.somafm.com/defcon-128-mp3" },
            { name: "XRAY.fm", city: "Portland", genre: "Independent", url: "https://streaming.xray.fm/stream" },
            { name: "Gimme Radio", city: "San Francisco", genre: "Metal", url: "http://188.166.194.139:8000/gimmeradio" },
            { name: "Secret Agent from SomaFM", city: "San Francisco", genre: "Lounge", url: "http://ice1.somafm.com/secretagent-128-mp3" },
            { name: "Deep Space One", city: "Online", genre: "Space Ambient", url: "http://ice1.somafm.com/deepspaceone-128-mp3" },
            { name: "FIP", city: "Paris (USA Stream)", genre: "Eclectic", url: "http://icecast.radiofrance.fr/fip-hifi.mp3" }
        ],
        "United Kingdom": [
            { name: "BBC Radio 1", city: "London", genre: "Pop", url: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one" },
            { name: "BBC Radio 2", city: "London", genre: "Adult Contemporary", url: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_two" },
            { name: "BBC Radio 3", city: "London", genre: "Classical", url: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_three" },
            { name: "BBC Radio 4", city: "London", genre: "News/Talk", url: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_fourfm" },
            { name: "BBC 6 Music", city: "London", genre: "Alternative", url: "http://stream.live.vc.bbcmedia.co.uk/bbc_6music" },
            { name: "Capital FM", city: "London", genre: "Top 40", url: "http://media-ice.musicradio.com/CapitalUKMP3" },
            { name: "Classic FM", city: "London", genre: "Classical", url: "http://media-ice.musicradio.com/ClassicFMMP3" },
            { name: "NTS Radio", city: "London", genre: "Underground", url: "http://stream-relay-geo.ntslive.net/stream" },
            { name: "Rinse FM", city: "London", genre: "Electronic/Grime", url: "http://streamer.rinse.fm/rinsefm.mp3" },
            { name: "LBC", city: "London", genre: "Talk", url: "http://media-ice.musicradio.com/LBCUKMP3" },
            { name: "Planet Rock", city: "London", genre: "Rock", url: "http://tx.planetradio.co.uk/icecast.php?i=planetrock.mp3" },
            { name: "Jazz FM", city: "London", genre: "Jazz", url: "http://tx.planetradio.co.uk/icecast.php?i=jazzfm.aac" },
            { name: "Scala Radio", city: "London", genre: "Modern Classical", url: "http://tx.planetradio.co.uk/icecast.php?i=scalaradio.aac" },
            { name: "Absolute Radio", city: "London", genre: "Rock", url: "http://ais.absoluteradio.co.uk/absoluteradio.mp3" },
            { name: "Kerrang! Radio", city: "London", genre: "Rock/Metal", url: "http://tx.planetradio.co.uk/icecast.php?i=kerrang.mp3" },
            { name: "Worldwide FM", city: "London", genre: "Eclectic", url: "https://worldwidefm.out.airtime.pro/worldwidefm_a" },
            { name: "Soho Radio", city: "London", genre: "Eclectic/Culture", url: "https://s2.radio.co/s5f2849591/listen" },
            { name: "Reprezent Radio", city: "London", genre: "Hip Hop/Electronic", url: "http://radio.reprezent.org.uk:8000/stream" },
            { name: "Subtle Radio", city: "London", genre: "Bass Music", url: "https://subtleradio.out.airtime.pro/subtleradio_a" },
            { name: "The Lot Radio", city: "New York/London", genre: "Underground Electronic", url: "https://thelot.out.airtime.pro/thelot_a" }
        ],
        "Germany": [
            { name: "Deutschlandfunk", city: "Cologne", genre: "News/Talk", url: "https://st01.dlf.de/dlf/01/128/mp3/stream.mp3" },
            { name: "FluxFM", city: "Berlin", genre: "Alternative", url: "http://stream.fluxfm.de/fluxfm-berlin/mp3-128/streams.fluxfm.de/" },
            { name: "Radio BOB!", city: "Kassel", genre: "Rock", url: "http://streams.radiobob.de/bob-live/mp3-192/mediaplayer" },
            { name: "Antenne Bayern", city: "Ismaning", genre: "Pop", url: "http://mp3channels.webradio.antenne.de/antenne" },
            { name: "JazzRadio", city: "Berlin", genre: "Jazz", url: "http://www.jazzradio.net/stream" },
            { name: "Klassik Radio", city: "Hamburg", genre: "Classical", url: "http://streams.klassikradio.de/live/mp3-128/stream.klassikradio.de" },
            { name: "ByteFM", city: "Hamburg", genre: "Indie", url: "https://stream.byte.fm/bytefm-128.mp3" },
            { name: "EgoFM", city: "Munich", genre: "Indie/Alternative", url: "http://stream.egofm.de/egofm/mp3-128/vtuner/" },
            { name: "Radio Fritz", city: "Potsdam", genre: "Youth", url: "http://rbb-fritz-live.cast.addradio.de/rbb/fritz/live/mp3/128/stream.mp3" },
            { name: "Sunshine Live", city: "Mannheim", genre: "Techno", url: "http://stream.sunshine-live.de/live/mp3-128/sunshinelive" },
            { name: "Radioeins", city: "Potsdam", genre: "Public/Eclectic", url: "http://rbb-radioeins-live.cast.addradio.de/rbb/radioeins/live/mp3/128/stream.mp3" },
            { name: "WDR 5", city: "Cologne", genre: "Talk/Documentary", url: "http://wdr-wdr5-live.icecast.wdr.de/wdr/wdr5/live/mp3/128/stream.mp3" },
            { name: "Cosmo", city: "Cologne", genre: "World Music", url: "http://wdr-cosmo-live.icecast.wdr.de/wdr/cosmo/live/mp3/128/stream.mp3" },
            { name: "Rock Antenne", city: "Ismaning", genre: "Classic Rock", url: "http://mp3.webradio.rockantenne.de/rockantenne" },
            { name: "Delta Radio", city: "Kiel", genre: "Alternative", url: "http://streams.deltaradio.de/delta-live/mp3-192/mediaplayer-playlist/" },
            { name: "Radio Hamburg", city: "Hamburg", genre: "Top 40", url: "https://stream.radiohamburg.de/rhh-live/mp3-192/listenlive" },
            { name: "NDR 2", city: "Hamburg", genre: "Pop", url: "http://icecast.ndr.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3" },
            { name: "BLN.FM", city: "Berlin", genre: "Electronic", url: "https://bln.fm/stream/" },
            { name: "80s80s", city: "National", genre: "80s Pop", url: "http://streams.80s80s.de/web/mp3-192" },
            { name: "Absolut Relax", city: "National", genre: "Soft Pop/Chill", url: "https://absolutradio.de/playlist/absolut-relax.m3u" }
        ],
        "Canada": [
            { name: "CBC Radio One", city: "Toronto", genre: "News/Talk", url: "http://cbc_r1_tor.akacast.akamaistream.net/7/632/451661/v1/rc.akacast.akamaistream.net/cbc_r1_tor" },
            { name: "CBC Music", city: "Toronto", genre: "Eclectic", url: "http://cbc_r2_tor.akacast.akamaistream.net/7/364/451661/v1/rc.akacast.akamaistream.net/cbc_r2_tor" },
            { name: "Indie88", city: "Toronto", genre: "Indie Rock", url: "http://icecast.indie88.com/indie88" },
            { name: "Jazz FM91", city: "Toronto", genre: "Jazz", url: "http://jazzfm91.streamb.live/SB00009" },
            { name: "CHOM 97.7", city: "Montreal", genre: "Rock", url: "https://rfcmedia.streamon.fm/chom" },
            { name: "Boom 97.3", city: "Toronto", genre: "70s/80s/90s", url: "http://boom973.akacast.akamaistream.net/7/850/177421/v1/astral.akacast.akamaistream.net/boom973" },
            { name: "The Edge 102.1", city: "Toronto", genre: "Alternative Rock", url: "https://edge.streamon.fm/CFNY-48k.aac" },
            { name: "Classical 96.3 FM", city: "Toronto", genre: "Classical", url: "http://classical963.streamon.fm:8000/CFMZ-48k.aac" },
            { name: "CKUA", city: "Edmonton", genre: "Eclectic", url: "http://ckualive.stream.kualabs.com/ckua_lq.mp3" },
            { name: "CJSW 90.9", city: "Calgary", genre: "College Radio", url: "http://stream.cjsw.com/cjsw.mp3" },
            { name: "CIUT-FM", city: "Toronto", genre: "Community/Variety", url: "http://s2.voscast.com:8026/;" },
            { name: "The Hawk 101.5", city: "Halifax", genre: "Classic Rock", url: "http://thehawk.streamon.fm:8000/CIGO-48k.aac" },
            { name: "Première Chaîne", city: "Montreal", genre: "French Talk", url: "http://cbc_r1_mtl.akacast.akamaistream.net/7/949/451661/v1/rc.akacast.akamaistream.net/cbc_r1_mtl" },
            { name: "Ici Musique", city: "Montreal", genre: "French Eclectic", url: "http://cbc_r2_mtl.akacast.akamaistream.net/7/92/451661/v1/rc.akacast.akamaistream.net/cbc_r2_mtl" },
            { name: "CFOX 99.3", city: "Vancouver", genre: "Rock", url: "https://cfox.streamon.fm/CFOX-48k.aac" },
            { name: "KiSS 92.5", city: "Toronto", genre: "Top 40", url: "https://rogers-hls.leanstream.co/rogers/tor925.stream/playlist.m3u8" },
            { name: "Q107", city: "Toronto", genre: "Classic Rock", url: "https://q107.streamon.fm/CILQ-48k.aac" },
            { name: "Fresh 103.1", city: "London, ON", genre: "Hot AC", url: "https://freshfm.streamon.fm:8000/CKFM-48k.aac" },
            { name: "CFMU 93.3", city: "Hamilton", genre: "Campus Radio", url: "https://s4.radio.co/s2b2b64444/listen" },
            { name: "CITR 101.9", city: "Vancouver", genre: "Campus Radio", url: "http://live.citr.ca:8000/live.mp3" }
        ],
        "France": [
            { name: "FIP", city: "Paris", genre: "Eclectic", url: "http://icecast.radiofrance.fr/fip-hifi.mp3" },
            { name: "France Inter", city: "Paris", genre: "News/Talk", url: "http://icecast.radiofrance.fr/franceinter-hifi.mp3" },
            { name: "France Musique", city: "Paris", genre: "Classical/Jazz", url: "http://icecast.radiofrance.fr/francemusique-hifi.mp3" },
            { name: "France Culture", city: "Paris", genre: "Culture/Talk", url: "http://icecast.radiofrance.fr/franceculture-hifi.mp3" },
            { name: "RFI Monde", city: "Paris", genre: "World News", url: "http://live.rfi.fr/wor/en/pub/out/mp3/128/stream.mp3" },
            { name: "Radio Nova", city: "Paris", genre: "World/Electronic", url: "http://novazz.ice.infomaniak.ch/novazz-128.mp3" },
            { name: "Nostalgie", city: "Paris", genre: "80s/90s Hits", url: "http://185.52.127.132/fr/30601/mp3_128.mp3?origine=fluxradios" },
            { name: "NRJ", city: "Paris", genre: "Top 40", url: "http://185.52.127.132/fr/30001/mp3_128.mp3" },
            { name: "Radio Classique", city: "Paris", genre: "Classical", url: "http://radioclassique.ice.infomaniak.ch/radioclassique-high.mp3" },
            { name: "TSF Jazz", city: "Paris", genre: "Jazz", url: "http://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3" },
            { name: "Le Mouv'", city: "Paris", genre: "Youth/Alternative", url: "http://icecast.radiofrance.fr/mouv-hifi.mp3" },
            { name: "Latina", city: "Paris", genre: "Latin", url: "http://start-latina.ice.infomaniak.ch/start-latina-high.mp3" },
            { name: "Radio Meuh", city: "Reblochon", genre: "Eclectic", url: "http://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3" },
            { name: "Chante France", city: "Paris", genre: "French Pop", url: "http://stream.chantef.fr/chantefrance.mp3" },
            { name: "FG Chic", city: "Paris", genre: "Lounge/Chillout", url: "http://radiofg.impek.com/fg_chic" },
            { name: "Fun Radio", city: "Paris", genre: "Dance", url: "http://streaming.radio.funradio.fr/fun-1-44-128" },
            { name: "RTL", city: "Paris", genre: "General", url: "http://streaming.radio.rtl.fr/rtl-1-44-128" },
            { name: "Europe 1", city: "Paris", genre: "General", url: "http://ais-live.cloud-services.paris:8000/europe1.mp3" },
            { name: "BFM Business", city: "Paris", genre: "Business News", url: "http://audio.bfmtv.com/bfmbusiness_128.mp3" },
            { name: "Rire et Chansons", city: "Paris", genre: "Comedy/Pop", url: "http://185.52.127.132/fr/30401/mp3_128.mp3" }
        ],
         "Australia": [
            { name: "Triple J", city: "Sydney", genre: "Alternative", url: "https://ic6.mainstreamnetwork.com/triplej-128.mp3" },
            { name: "Double J", city: "Sydney", genre: "Nostalgic Alt", url: "http://live-radio01.mediahubaustralia.com/3DBL/mp3/" },
            { name: "ABC Classic", city: "Sydney", genre: "Classical", url: "http://live-radio01.mediahubaustralia.com/3ABCFM/mp3/" },
            { name: "ABC RN", city: "Sydney", genre: "Talk/News", url: "https://ic6.mainstreamnetwork.com/abcrn-128.mp3" },
            { name: "PBS 106.7FM", city: "Melbourne", genre: "Community/Specialist", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/PBSFM_ADP.m3u8" },
            { name: "RRR 102.7FM", city: "Melbourne", genre: "Community/Music", url: "http://real.rrr.org.au:8000/128" },
            { name: "FBi Radio 94.5", city: "Sydney", genre: "Local Music/Arts", url: "http://stream.fbiradio.com:8000/stream.mp3" },
            { name: "4ZZZ", city: "Brisbane", genre: "Community", url: "http://stream.4zzz.org.au:8000/4zzz" },
            { name: "2SER 107.3", city: "Sydney", genre: "Community", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/2SERAAC.aac" },
            { name: "RTRFM 92.1", city: "Perth", genre: "Community/Music", url: "http://live-stream.rtrfm.com.au:8000/stream" },
            { name: "SmoothFM 95.3", city: "Sydney", genre: "Easy Listening", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/SMOOTHFM_SC" },
            { name: "Nova 96.9", city: "Sydney", genre: "Top 40", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/NOVA969_SC" },
            { name: "KIIS 106.5", city: "Sydney", genre: "Top 40", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/KIIS1065_SC" },
            { name: "Gold 104.3", city: "Melbourne", genre: "Classic Hits", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/GOLD1043_SC" },
            { name: "SEN 1116", city: "Melbourne", genre: "Sports", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/SEN1116.mp3" },
            { name: "ABC Jazz", city: "National", genre: "Jazz", url: "http://live-radio01.mediahubaustralia.com/3JAZ/mp3/" },
            { name: "ABC Country", city: "National", genre: "Country", url: "http://live-radio01.mediahubaustralia.com/3ABCR/mp3/" },
            { name: "KIIS 101.1", city: "Melbourne", genre: "Top 40", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/KIIS1011.mp3" },
            { name: "CADA 96.1", city: "Sydney", genre: "Hip Hop/RnB", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/CADA.mp3" },
            { name: "3AW", city: "Melbourne", genre: "News/Talk", url: "https://stream.3aw.com.au/3aw" }
        ],
        "Japan": [
            { name: "Asia Dream Radio", city: "Nagoya", genre: "J-Pop", url: "http://listen.asiadreamradio.com:8000/hi" },
            { name: "Vocaloid Radio", city: "Online", genre: "Vocaloid", url: "http://curiosity.shoutca.st:8019/stream" },
            { name: "AFN Tokyo", city: "Tokyo", genre: "US Military", url: "http://202.218.219.100:8000/stream.mp3" },
            { name: "Japan Hits", city: "Online", genre: "J-Pop", url: "http://listen.181fm.com/181-jpop_128k.mp3" },
            { name: "AnimeNfo", city: "Online", genre: "Anime", url: "http://animeradio.su:8000/stream" },
            { name: "FM Karuizawa", city: "Karuizawa", genre: "Community", url: "http://fm-karuizawa.co.jp/simul-radio.htm" },
            { name: "Radio Kishiwada", city: "Osaka", genre: "Community", url: "http://www.radiokishiwada.jp/simul/" },
            { name: "Kyoto Sanjo", city: "Kyoto", genre: "Community", url: "http://radiocafe.jp/simul/" },
            { "name": "J-Rock Powerplay", "city": "Online", "genre": "J-Rock", "url": "http://178.32.137.195:8167/stream" },
            { "name": "J-Pop Powerplay", "city": "Online", "genre": "J-Pop", "url": "http://178.32.137.195:8130/stream" },
            { "name": "FM Nishi-Tokyo", "city": "Tokyo", "genre": "Community", "url": "http://s3.radio.co/s3e41b65e9/listen" },
            { "name": "FM SETO", "city": "Seto", "genre": "Community", "url": "http://s2.radio.co/s2f9b841e2/listen" },
            { "name": "FM Hirakata", "city": "Osaka", "genre": "Community", "url": "https://s3.radio.co/s57c2c5e53/listen" },
            { "name": "FM Odawara", "city": "Odawara", "genre": "Community", "url": "http://s2.radio.co/s3e015d9a9/listen" },
            { "name": "Kittikun Minimal Techno", "city": "Online", "genre": "Techno", "url": "http://192.99.8.192:2566/;" },
            { "name": "Banana FM", "city": "Wakayama", "genre": "Community", "url": "http://s4.radio.co/s2b2b64444/listen" },
            { "name": "FM Nanami", "city": "Aichi", "genre": "Community", "url": "http://s2.radio.co/s4c935414d/listen" },
            { "name": "Momo-Lala", "city": "Online", "genre": "Classical", "url": "http://192.99.8.192:5694/stream" },
            { "name": "Radio Hayama", "city": "Hayama", "genre": "Community", "url": "http://s3.radio.co/s215b28a9b/listen" },
            { "name": "Retro PC Game Music", "city": "Online", "genre": "Video Game Music", "url": "http://172.93.103.11:8060/stream" }
        ],
        "Brazil": [
            { name: "Antena 1", city: "São Paulo", genre: "Lite Adult Contemporary", url: "http://antena1.newradio.it/stream" },
            { name: "Rádio Gaúcha", city: "Porto Alegre", genre: "News/Talk/Sports", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/RGAUCHA.mp3" },
            { name: "CBN", city: "São Paulo", genre: "News/Talk", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/CBNSP.mp3" },
            { name: "Kiss FM", city: "São Paulo", genre: "Classic Rock", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/KISSFM.mp3" },
            { name: "89 FM A Rádio Rock", city: "São Paulo", genre: "Rock", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADioroCK.mp3" },
            { name: "BandNews FM", city: "São Paulo", genre: "News", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/BANDNEWS_SP.mp3" },
            { name: "Alpha FM", city: "São Paulo", genre: "Adult Contemporary", url: "http://players.alphastream.com.br:80/alpha-hd" },
            { name: "Bossa Nova Brazil", city: "Online", genre: "Bossa Nova", url: "https://centova.radios.com.br/proxy/834?mp=/stream" },
            { name: "Radio Cidade", city: "Rio de Janeiro", genre: "Rock", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIOCIDADE_RJ.mp3" },
            { name: "Transamérica Pop", city: "São Paulo", genre: "Pop", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/TRASP_SP.mp3" },
            { name: "Nativa FM", city: "São Paulo", genre: "Sertanejo", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/NATIVAFMSP.mp3" },
            { name: "Mundo Livre FM", city: "Curitiba", genre: "Alternative", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/MUNDOLIVRE.mp3" },
            { name: "Rádio Itapema", city: "Florianópolis", genre: "Adult Alternative", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/ITAPEMAFMFLN.mp3" },
            { name: "Choro Brazil", city: "Online", genre: "Choro", url: "http://stream.choro.live:8000/stream" },
            { name: "Jovem Pan FM", city: "São Paulo", genre: "Pop/Talk", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/JP_SP_FM.mp3" },
            { name: "Rádio Mix FM", city: "São Paulo", genre: "Pop", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/MIXFM_SP.mp3" },
            { name: "Rádio Melodia", city: "Rio de Janeiro", genre: "Gospel", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/RDMELODIA.mp3" },
            { name: "JB FM", city: "Rio de Janeiro", genre: "Adult Contemporary", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/JBFM.mp3" },
            { name: "Energia 97", city: "São Paulo", genre: "Electronic Dance", url: "https://energia.api.stm.streamingmedia.com.br/player-fm/remote/;" },
            { name: "Dum-Dum FM", city: "Online", genre: "Hip Hop", url: "https://servidor31.brlogic.com:8132/live" }
        ],
        "Italy": [
            { name: "RAI Radio 1", city: "Rome", genre: "News/Talk", url: "http://icestreaming.rai.it/1.mp3" },
            { name: "RAI Radio 2", city: "Rome", genre: "Pop/Talk", url: "http://icestreaming.rai.it/2.mp3" },
            { name: "RAI Radio 3", city: "Rome", genre: "Classical/Culture", url: "http://icestreaming.rai.it/3.mp3" },
            { name: "Radio Deejay", city: "Milan", genre: "Pop", url: "http://radiodeejay-lh.akamaihd.net/i/RadioDeejay_Live_1@189857/master.m3u8" },
            { name: "Radio 105", city: "Milan", genre: "Top 40", url: "http://icecast.105.net/105.mp3" },
            { name: "Virgin Radio", city: "Milan", genre: "Rock", url: "http://icecast.unitedradio.it/Virgin.mp3" },
            { name: "R101", city: "Milan", genre: "Pop", url: "http://icecast.unitedradio.it/r101.mp3" },
            { name: "Radio Monte Carlo", city: "Milan", genre: "Lounge/Pop", url: "http://edge.singsingmusic.net/rmc.mp3" },
            { name: "RDS", city: "Rome", genre: "Pop", url: "https://stream.rds.radio/rds/mp3-128" },
            { name: "Radio Capital", city: "Rome", genre: "Classic Hits/Soul", url: "http://radiocapital-lh.akamaihd.net/i/RadioCapital_Live_1@196312/master.m3u8" },
            { name: "m2o", city: "Rome", genre: "Dance", url: "http://radiom2o-lh.akamaihd.net/i/RadioM2o_Live_1@189858/master.m3u8" },
            { name: "Radio Kiss Kiss", city: "Naples", genre: "Pop", url: "http://kiskis.ice.infomaniak.ch/kiskis-128.mp3" },
            { name: "Radiofreccia", city: "Milan", genre: "Rock", url: "https://streamingv2.shoutcast.com/radiofreccia" },
            { name: "Radio 24", city: "Milan", genre: "News/Talk", url: "http://shoutcast.radio24.it:8000/;" },
            { name: "Radio Subasio", city: "Assisi", genre: "Italian Pop", url: "http://onair18.xdevel.com:8002/;" },
            { name: "Discoradio", city: "Milan", genre: "Dance/Pop", url: "http://icecast.discoradio.it:8000/discoradio.mp3" },
            { name: "Radio Sportiva", city: "Prato", genre: "Sports", url: "http://onair18.xdevel.com:8032/;" },
            { name: "Radio Popolare", city: "Milan", genre: "Independent/Talk", url: "https://www.radiopopolare.it/streaming/radiopopolare.mp3" },
            { name: "Lifegate Radio", city: "Milan", genre: "New Age/Chillout", url: "https://stream.lifegate.it/lifegate_radio.mp3" },
            { name: "Radio Radicale", city: "Rome", genre: "Political/Talk", url: "https://stream.radioradicale.it/radioradicale_1-128.mp3" }
        ]
    };

    const countrySelect = document.getElementById('country-select') as HTMLSelectElement;
    const stationList = document.getElementById('station-list') as HTMLUListElement;
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    const display = document.getElementById('display') as HTMLDivElement;

    const populateCountries = () => {
        const countries = Object.keys(radioData).sort();
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    };

    const displayStations = (country: string) => {
        stationList.innerHTML = '';
        if (!country || !radioData[country]) {
            display.textContent = 'Select a country to see stations';
            return;
        }

        const stations = radioData[country];
        stations.forEach(station => {
            const listItem = document.createElement('li');
            listItem.tabIndex = 0;
            listItem.setAttribute('role', 'option');
            listItem.setAttribute('aria-selected', 'false');

            const stationName = document.createElement('span');
            stationName.className = 'station-name';
            stationName.textContent = station.name;

            const stationGenre = document.createElement('span');
            stationGenre.className = 'station-genre';
            stationGenre.textContent = station.genre;
            
            listItem.appendChild(stationName);
            listItem.appendChild(stationGenre);

            const clickHandler = () => playStation(station, listItem);
            listItem.addEventListener('click', clickHandler);
            listItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clickHandler();
                }
            });

            stationList.appendChild(listItem);
        });
        display.textContent = `Showing ${stations.length} stations for ${country}`;
    };

    const playStation = (station: Station, listItem: HTMLLIElement) => {
        // Remove 'playing' class from any currently playing station
        const currentPlaying = stationList.querySelector('.playing');
        if (currentPlaying) {
            currentPlaying.classList.remove('playing');
            currentPlaying.setAttribute('aria-selected', 'false');
        }

        // Add 'playing' class to the selected station
        listItem.classList.add('playing');
        listItem.setAttribute('aria-selected', 'true');
        
        // Stop any current audio and unload the source to prevent errors on quick switching
        audioPlayer.pause();
        audioPlayer.src = ""; // Unload the current source
        
        audioPlayer.src = station.url;
        audioPlayer.load();

        const playPromise = audioPlayer.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully.
                display.textContent = `${station.name} — ${station.city} — ${station.genre}`;
            }).catch(error => {
                // The 'AbortError' is expected when a user switches stations quickly.
                // We can safely ignore it to keep the console clean.
                if (error.name === 'AbortError') {
                    console.log('Audio fetch aborted by user action. This is normal.');
                } else {
                    console.error(`Audio playback failed for ${station.name}:`, error.message);
                    display.textContent = `Failed to play: ${station.name}`;
                    listItem.classList.remove('playing');
                    listItem.setAttribute('aria-selected', 'false');
                }
            });
        }
    };

    countrySelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        displayStations(target.value);
    });

    // Initial setup
    populateCountries();
});
