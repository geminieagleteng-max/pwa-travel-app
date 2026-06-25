export const fukuokaTripData = {
  title: "2026 暑假日本福岡家庭旅遊",
  dates: "2026-06-27 (六) ~ 2026-07-03 (五)",
  members: ["自己", "旅伴A", "旅伴B", "旅伴C"],
  days: [
    {
      dayNum: 1,
      date: "6/27 (六)",
      title: "抵達福岡與運河城探索",
      hotel: "Amistad Hotel Fukuoka",
      spots: [
        {
          time: "09:30",
          name: "桃園機場第二航廈",
          desc: "亞洲航空（AirAsia）櫃檯開始報到辦理登機手續。",
          lat: 25.0797,
          lng: 121.2342,
          iconType: "airport"
        },
        {
          time: "12:00 -> 15:20",
          name: "搭機往福岡機場",
          desc: "順利起飛，航程約 2 小時 20 分鐘。",
          lat: 33.5859,
          lng: 130.4507,
          iconType: "airport"
        },
        {
          time: "16:00",
          name: "抵達福岡機場，坐計程車",
          desc: "機場出關，搭乘計程車直達 Amistad Hotel Fukuoka。",
          lat: 33.5859,
          lng: 130.4507,
          iconType: "taxi"
        },
        {
          time: "16:30",
          name: "Amistad Hotel 入住",
          desc: "辦理 Check-in 並放妥大件行李，稍作休息。",
          lat: 33.5823,
          lng: 130.4172,
          iconType: "hotel"
        },
        {
          time: "17:30",
          name: "博多運河城 (Canal City)",
          desc: "逛街購物，拉麵競技場享用晚餐，21:00 欣賞「鋼彈緊急出動」3D光雕水舞秀。",
          lat: 33.5898,
          lng: 130.4108,
          iconType: "shopping"
        }
      ]
    },
    {
      dayNum: 2,
      date: "6/28 (日)",
      title: "關門海峽、門司港與小倉古城巡禮",
      hotel: "Amistad Hotel Fukuoka",
      spots: [
        {
          time: "08:21 -> 09:07",
          name: "搭特急音速 7 號往小倉",
          desc: "博多前往小倉，車上補眠。小倉轉電車前往門司港。",
          lat: 33.5897,
          lng: 130.4208,
          iconType: "train"
        },
        {
          time: "10:00",
          name: "門司港小火車「潮風號」",
          desc: "購買「四葉草套票」，搭乘復古觀光小火車潮風號。",
          lat: 33.9442,
          lng: 130.9634,
          iconType: "sightseeing"
        },
        {
          time: "10:30",
          name: "關門海峽海底人行隧道",
          desc: "挑戰海底隧道，全長 780 公尺，跨越福岡與山口縣境。",
          lat: 33.9620,
          lng: 130.9579,
          iconType: "sightseeing"
        },
        {
          time: "11:15",
          name: "唐戶市場海鮮大餐",
          desc: "山口縣端搭巴士前往唐戶市場，享用新鮮握壽司與海鮮，順遊赤間神宮。",
          lat: 33.9575,
          lng: 130.9478,
          iconType: "restaurant"
        },
        {
          time: "13:15",
          name: "關門連絡船 (渡輪)",
          desc: "搭乘渡輪吹海風，跨海回到福岡門司港懷舊街區散步。",
          lat: 33.9575,
          lng: 130.9478,
          iconType: "ferry"
        },
        {
          time: "15:00",
          name: "小倉城與小倉城庭園",
          desc: "搭電車回小倉，漫步參觀小倉城，欣賞古城風光。",
          lat: 33.8841,
          lng: 130.8743,
          iconType: "sightseeing"
        }
      ]
    },
    {
      dayNum: 3,
      date: "6/29 (一)",
      title: "熊本城歷史與酷MA萌部長相會",
      hotel: "montan HAKATA",
      spots: [
        {
          time: "08:30",
          name: "換飯店：寄放行李至 montan",
          desc: "退房後，將行李移置 montan HAKATA 免費寄放，再前往博多站。",
          lat: 33.5855,
          lng: 130.4300,
          iconType: "hotel"
        },
        {
          time: "08:56 -> 09:34",
          name: "搭九州新幹線往熊本",
          desc: "從博多車站搭乘新幹線前往熊本站，轉路面電車。",
          lat: 33.5897,
          lng: 130.4208,
          iconType: "train"
        },
        {
          time: "10:00",
          name: "熊本城天守閣與城彩苑",
          desc: "登上重修完成的天守閣俯瞰市景，隨後逛櫻之馬場城彩苑。",
          lat: 32.8062,
          lng: 130.7058,
          iconType: "sightseeing"
        },
        {
          time: "12:00",
          name: "下通商店街午餐",
          desc: "逛街、藥妝採購，享用著名的馬肉料理或黑亭拉麵。",
          lat: 32.8010,
          lng: 130.7090,
          iconType: "restaurant"
        },
        {
          time: "14:30",
          name: "酷MA萌廣場 (熊本熊辦公室)",
          desc: "提早 30 分鐘卡位，15:00 欣賞萌部長精彩唱跳表演秀！",
          lat: 32.8028,
          lng: 130.7107,
          iconType: "sightseeing"
        },
        {
          time: "17:30",
          name: "montan HAKATA 正式入住",
          desc: "搭新幹線返回博多，回到 montan 辦理正式 Check-in 分配房間。",
          lat: 33.5855,
          lng: 130.4300,
          iconType: "hotel"
        }
      ]
    },
    {
      dayNum: 4,
      date: "6/30 (二)",
      title: "海之中道海洋水族館與海濱休閒",
      hotel: "montan HAKATA",
      spots: [
        {
          time: "09:22 -> 09:59",
          name: "搭 JR 往海之中道站",
          desc: "博多站搭乘 JR 鹿兒島本線到香椎站，轉香椎線至海之中道站。",
          lat: 33.5897,
          lng: 130.4208,
          iconType: "train"
        },
        {
          time: "10:00",
          name: "海之中道海洋世界 (水族館)",
          desc: "觀看 10:30 海豹餵食、11:00 沙丁魚燈光秀、11:45 海豚海獅主秀，Reilly 餐廳午餐。",
          lat: 33.6597,
          lng: 130.3621,
          iconType: "sightseeing"
        },
        {
          time: "13:30",
          name: "海之中道海濱公園",
          desc: "散步、放鬆身心，享受自然綠意，下午返回博多車站商圈。",
          lat: 33.6644,
          lng: 130.3547,
          iconType: "sightseeing"
        }
      ]
    },
    {
      dayNum: 5,
      date: "7/1 (三)",
      title: "福岡市區歷史巡禮與天神繁華街",
      hotel: "Richmond Hotel 福岡天神",
      spots: [
        {
          time: "09:30",
          name: "行李寄存至 Richmond Hotel",
          desc: "退房後將行李拖往天神 Richmond Hotel 免費寄放，再出發。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "hotel"
        },
        {
          time: "10:00",
          name: "祇園歷史散步 (櫛田神社)",
          desc: "地鐵至祇園站，參拜櫛田神社觀賞巨大的山笠神轎，川端通老街散步。",
          lat: 33.5930,
          lng: 130.4106,
          iconType: "sightseeing"
        },
        {
          time: "13:30",
          name: "天神商圈與天神地下街",
          desc: "歐風石磚地下街爆買，逛天神 LOFT、岩田屋百貨等。",
          lat: 33.5902,
          lng: 130.4014,
          iconType: "shopping"
        },
        {
          time: "18:00",
          name: "福岡塔絕美夜景",
          desc: "搭巴士至海濱百道，登上福岡塔觀賞 360 度日落與璀璨海灣夜景。",
          lat: 33.5932,
          lng: 130.3515,
          iconType: "sightseeing"
        },
        {
          time: "20:00",
          name: "中洲屋台街宵夜",
          desc: "體驗大排檔文化，享用博多一口餃子、豚骨拉麵與烤雞肉串。",
          lat: 33.5910,
          lng: 130.4085,
          iconType: "restaurant"
        }
      ]
    },
    {
      dayNum: 6,
      date: "7/2 (四)",
      title: "柳川水鄉搖船與太宰府天滿宮",
      hotel: "Richmond Hotel 福岡天神",
      spots: [
        {
          time: "08:30",
          name: "西鐵天神站出發",
          desc: "購買太宰府柳川套票，搭西鐵電車前往太宰府。",
          lat: 33.5900,
          lng: 130.4010,
          iconType: "train"
        },
        {
          time: "09:30",
          name: "太宰府天滿宮",
          desc: "求學問祈福，品嚐現烤梅枝餅，參觀隈研吾設計的星巴克。",
          lat: 33.5215,
          lng: 130.5348,
          iconType: "sightseeing"
        },
        {
          time: "14:00",
          name: "柳川遊船體驗",
          desc: "搭西鐵到柳川站，搭乘搖船聽船夫吟唱民謠，享受悠閒水鄉時光。",
          lat: 33.1610,
          lng: 130.4170,
          iconType: "ferry"
        },
        {
          time: "18:30",
          name: "天神高級黑毛和牛晚餐",
          desc: "回天神後享用豐富的燒肉或壽喜燒大餐，慶祝旅途尾聲。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "restaurant"
        }
      ]
    },
    {
      dayNum: 7,
      date: "7/3 (五)",
      title: "天神最後爆買與返台",
      hotel: "返家",
      spots: [
        {
          time: "09:00",
          name: "行李打包與退房",
          desc: "飯店早餐，退房寄放行李於 Richmond 櫃檯後進行最後血拼。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "hotel"
        },
        {
          time: "11:00",
          name: "天神/大名購物最後衝刺",
          desc: "選購未買齊的零食、藥妝，或逛潮流服飾店。",
          lat: 33.5860,
          lng: 130.3980,
          iconType: "shopping"
        },
        {
          time: "16:00",
          name: "搭計程車往福岡機場",
          desc: "Richmond 領行李，搭車直達機場國際航廈。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "taxi"
        },
        {
          time: "19:00 -> 20:25",
          name: "搭機返台",
          desc: "福岡機場起飛，抵達桃園機場二航廈，搭車回溫馨的家。",
          lat: 33.5859,
          lng: 130.4507,
          iconType: "airport"
        }
      ]
    }
  ]
};
