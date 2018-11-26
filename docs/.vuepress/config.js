module.exports = {
  title: "Uniqys Kit Documentation",
  description: "A documentation for Uniqys Kit",
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: "/favicon.ico" }],
  ],
  base: "/UniqysKitDocs/",
  markdown: {
    lineNumbers: true
  },
  locales: {
    "/": {
      lang: "en-US",
    },
    "/ja/": {
      lang: "ja-JP"
    }
  },
  themeConfig: {
    nav: [
      { text: 'uniqys.net', link: 'https://uniqys.net' },
    ],
    locales: {
      "/": {
        label: "English",
        lastUpdated: "Last Updated",
        selectText: "Languages",

        sidebar: [
          {
            title: "Introduction",
            collapsable: false,
            children: [
              "/introduction/what-is-uniqys-kit",
              "/introduction/install",
              "/introduction/get-started"
            ]
          },
          {
            title: "Uniqys CLI",
            collapsable: false,
            children: [
              "/uniqys-cli/uniqys-cli",
              "/uniqys-cli/config-file"
            ]
          },
          {
            title: "Chain Core",
            collapsable: false,
            children: [
              "/chain-core/chain-core",
              "/chain-core/blockchain"
            ]
          },
          {
            title: "Easy Framework",
            collapsable: false,
            children: [
              "/easy-framework/easy-framework",
              "/easy-framework/api",
              "/easy-framework/easy-client"
            ]
          }
        ]
      },
      "/ja/": {
        label: "日本語",
        lastUpdated: "最終更新",
        selectText: "言語",
        
        sidebar: [
          {
            title: "イントロダクション",
            collapsable: false,
            children: [
              "/ja/introduction/what-is-uniqys-kit",
              "/ja/introduction/install",
              "/ja/introduction/get-started"
            ]
          },
          {
            title: "Uniqys CLI",
            collapsable: false,
            children: [
              "/ja/uniqys-cli/uniqys-cli",
              "/ja/uniqys-cli/config-file"
            ]
          },
          {
            title: "Chain Core",
            collapsable: false,
            children: [
              "/ja/chain-core/chain-core",
              "/ja/chain-core/blockchain"
            ]
          },
          {
            title: "Easy Framework",
            collapsable: false,
            children: [
              "/ja/easy-framework/easy-framework",
              "/ja/easy-framework/api",
              "/ja/easy-framework/easy-client"
            ]
          }
        ]
      }
    }
  }
}
