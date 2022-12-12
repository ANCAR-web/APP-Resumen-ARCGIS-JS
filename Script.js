let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

const cargarapp = ()=>{
    loginForm.classList.add('active');
}

 require([ "esri/config",
           "esri/Map",
           "esri/views/MapView",
           "esri/widgets/Search",
           "esri/widgets/BasemapToggle",
           "esri/widgets/Locate",
           "esri/widgets/Track",
           "esri/Graphic",
           "esri/layers/FeatureLayer",
           "esri/widgets/Editor",
           "esri/widgets/Expand",
           "esri/rest/support/Query",
           "esri/widgets/Legend",],
           (esriConfig,
            Map,
            MapView,
            Search,
            BasemapToggle,
            Locate,
            Track,
            Graphic,
            FeatureLayer,
            Editor,
            Expand,
            Query,
            Legend,)=>{
        esriConfig.apiKey = "AAPKc0b5b552c4324dc29a90351172d2b735eM1eJrecMDQYEQZi4rnGIPsjY_Llxx1p0nXXbkHOEsxXmYiO6lqTiBkAGXsSplrm";
        
        const map = new Map({
        basemap: "arcgis-topographic"
        });

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-88.114611,15.51503],
            zoom: 12
          });

        const search = new Search({ 
            view: view
        }); 
      
          view.ui.add(search, "top-right")
        
        const basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: "arcgis-imagery-standard"
         });

         view.ui.add(basemapToggle,"bottom-right");

         const locate = new Locate({
            view: view,
            useHeadingEnabled: false,
            goToOverride: (view, options)=> {
              options.target.scale = 2000;
              return view.goTo(options.target);
            }
          });

        view.ui.add(locate, "top-left");
        
        const track = new Track({
            view: view,
            graphic: new Graphic({
              symbol: {
                type: "simple-marker",
                size: "14px",
                color: "green",
                outline: {
                  color: "#efefef",
                  width: "1.5px"
                }
              }
            }),
            useHeadingEnabled: false
          });
          view.ui.add(track, "top-left");

          const popupredvial = {
            "title": "Red vial municipio de: {municipio}",
            "content": [{
              "type": "fields",
              "fieldInfos": [
                {
                  "fieldName": "depto",
                  "label": "Departamento",
                  "isEditable": true,
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "text-box"
                },
                {
                  "fieldName": "velocidad",
                  "label": "Velocidad",
                  "isEditable": true,
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "text-box"
                },
                {
                  "fieldName": "kms",
                  "label": "Kilometro",
                  "isEditable": true,
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "text-box"
                },
    
                {
                  "fieldName": "tiempo",
                  "label": "Tiempo",
                  "isEditable": true,
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
    
                  "stringFieldOption": "text-box"
                },
                {
                    "fieldName": "nomenclatu",
                    "label": "Nomeclantura",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                      "places": 2,
                      "digitSeparator": true
                    },
      
                    "stringFieldOption": "text-box"
                  },
                  {
                    "fieldName": "tipo",
                    "label": "Tipo de red vial",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                      "places": 2,
                      "digitSeparator": true
                    },
      
                    "stringFieldOption": "text-box"
                  }
              ]
            }]
          };

          function styleredvial(value, color) {
            return {
              "value": value,
              "symbol": {
                "type": "simple-line",
                "style": "solid",
                "color": color,
                "outline": {
                  "style": "none"
                }
              },
              "label": value
            };
          }

          const style_redvial_data = {
            type: "unique-value",
            field: "tipo",
            uniqueValueInfos: [
                styleredvial("Calle de Tierra", "#65EC07"),
                styleredvial("Calle Pavimentada", "#F10D0D"),
                styleredvial("Peatonal", "#0A63E3"),
            ]
          };

        const redvial = new FeatureLayer({
        url: "https://services7.arcgis.com/BkBWluvkeY0YU2ux/arcgis/rest/services/Red_Vial_SPS/FeatureServer",
        renderer: style_redvial_data,
        popupTemplate:popupredvial,
        outFields:["depto","velocidad","kms","tiempo","nomenclatu","tipo"]});

        map.add(redvial,1);

        const popucentrospoblados = {
          "title": "Centro poblados",
          "content": [{
            "type": "fields",
            "fieldInfos": [
              {
                "fieldName": "Nombre",
                "label": "NOMBRE",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": null,
                "stringFieldOption": "text-box"
              },
              {
                "fieldName": "GEOCODIGO",
                "label": "Geocodigo",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": null,
                "stringFieldOption": "text-box"
              },
              {
                "fieldName": "Densidad",
                "label": "Densidad",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": null,
                "stringFieldOption": "text-box"
              }]}]
        };

        const estiloestaciones = {
          "type": "simple",
          "symbol": {
            "type": "picture-marker",
            "url": "https://cdn-icons-png.flaticon.com/512/3382/3382573.png",
            "width": "22px",
            "height": "22px"
          }
        };

     const centros_poblados = new FeatureLayer({
      url:"https://services7.arcgis.com/BkBWluvkeY0YU2ux/arcgis/rest/services/aldeashon_SPS/FeatureServer",
      renderer:estiloestaciones,
      popupTemplate:popucentrospoblados,
      outFields:["NOMBRE","GEOCODIGO","Densidad"]
     });

     map.add(centros_poblados,1);

    
     const popumunicpios = {
      "title": "Municipio de San Pedro Sula",
      "content": [{
        "type": "fields",
        "fieldInfos": [
          {
            "fieldName": "Nombre",
            "label": "NOMBRE",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          },
          {
            "fieldName": "POB_2000",
            "label": "Poblacion 2000",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          },
          {
            "fieldName": "IDH_2002",
            "label": "Indice de desarrollo humano",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          }]}]
    };

    const municipio = new FeatureLayer({
      url:"https://services7.arcgis.com/BkBWluvkeY0YU2ux/arcgis/rest/services/SPS_Municipio/FeatureServer",
      popupTemplate:popumunicpios,
      outFields:["NOMBRE","POB_2000","IDH_2002"],
      opacity:0.4
     });

     map.add(municipio,0);
   
    const editor = new Editor({
      view: view});
  
        const expand = new Expand({
          expandIconClass: "esri-icon-edit",
          view: view,
          content: editor
        });

    view.ui.add(expand, "bottom-left");


       centros_poblados.queryFeatures().then((results)=>{
        let indicador1 = document.getElementById("Indicador1");
        indicador1.innerHTML = "Total de: " + results.features.length + "  centros poblados en SPS";
       })
      

       const muni = document.getElementById("container-munici");
        const expand2 = new Expand({
          expandIconClass: "esri-icon-collection",
          view: view,
          content: muni
        });

        view.ui.add(expand2, "top-left");

      
        





 });