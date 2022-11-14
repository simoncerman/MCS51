module.exports = {
    label: "Menu",
    submenu: [
        { 
          label: "One",
          submenu: []
        },
        {
          label: "Two",
          submenu: []
        },
        {
          label: "Quit", 
          click() {
            app.quit()
          }
        }
      ]
}