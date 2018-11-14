module.exports = {
  title: "Uniqys Kit Documentation",
  description: "A documentation for Uniqys Kit",
  markdown: {
    lineNumbers: true
  },
  locales: {
    "/": {
      lang: "en-US"
    },
    "/ja/": {
      lang: "ja-JP"
    }
  },
  themeConfig: {
    locales: {
      "/": {
        label: "English",
        lastUpdated: "Last Updated",
        selectText: "Languages"
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
