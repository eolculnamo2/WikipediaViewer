<template>
<div>
    <img class="center" id="img-id" src="./assets/logo.png" alt="vue-logo">
    <div class="search-container">
        <img v-on:click = "viewSearch()" class="search-icon" src="./assets/search.svg" alt="magnifier">
        <input id="search-input-id" class="search-input" ref="searchInput" placeholder="Search Here">
    </div>
    <button id="search-button-id" class="search-button hide" v-on:click = "makeSearch()">
        Search
        </button>
       
    <div style="display: none"> {{search}} </div>

      <ul>
          <li :key="cerca.link" v-for="cerca in searchArr">
                <a :href=cerca.link>
                    <h1>
                        {{cerca.title}}
                    </h1>
                </a>
                    <h4>
                        {{cerca.description}}
                    </h4>
              </li>
      </ul>

    
  
</div>
</template>
<script>
export default {
  name: 'search',
  data(){
      return{
          searchArr: [],
          search: ''
      }
  },
  updated(){
            var uri = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+this.search+"&format=json&origin=*";
            
            fetch(uri)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                this.parseApi(data)
        })
      
  },
  methods: {
      parseApi: function(x){
          this.searchArr=[];
          x[1].forEach((name,i)=>{

              var searchData = {
                  title: name,
                  link: x[3][i],
                  description: x[2][i]
              }

              this.searchArr.push(searchData)
          })
      },
      makeSearch(){
          document.getElementById("img-id").classList.add("pulse");
          this.search = this.$refs.searchInput.value;
          setTimeout(()=>{
            document.getElementById("img-id").classList.remove("pulse");
          },550)
      },
      viewSearch(){
          document.getElementById("search-input-id").classList.add("expand")
          setTimeout((()=>{
              document.getElementById("search-button-id").classList.remove("hide")
              document.getElementById("search-button-id").classList.add("appear")
          }),900)
          
      }
  },
}
</script>
<style lang="scss">
    ul{
        padding: 0;
        list-style-type: none;
        width: 75vw;
        margin: auto;
            a{
                text-decoration: none;
            }
            li{
                margin: 10px auto;
                border: 1px solid black;
            }
            h1{
                margin: 0;
                color:#78bc69;
                background-color: #f4f4f4;
            }
            h4{
                text-align: center;
            }
        }
    .search-input{
        display: none;
        padding: 5px 10px;
        border-radius: 5px;
        margin: 0 2px;
        max-height: 20px;
        align-self: center;
    }
    .expand{
        display: inline;
        animation-name: grow;
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-timing-function: linear;
        animation-iteration-count: 1;
    }
    .appear{
        display: block;
        margin: auto;
        animation-name: show;
        animation-duration: .15s;
        animation-fill-mode: both;
        animation-timing-function: linear;
        animation-direction: alternate;
        animation-iteration-count: 1;
    }
    .pulse{
        animation-name: pulse;
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-timing-function: linear;
        animation-iteration-count: 1;
    }
    .hide{
        display: none;
    }
    .search-button{
        width: 100px;
        background-color: #b3ea8f;
        border-radius: 10px;
        padding: 7px;
        margin: 0 auto;
    }
    .search-container{
        display: flex;
        justify-content: center;
        max-height: 65px;
    }
    .center{
        display: block;
        margin: auto;
    }
    .search-icon{
        width: 35px;
        cursor: pointer;
    }
    @keyframes grow {
        from{width: 0;}
        to{width: 100px;}
    }
    @keyframes show {
        from{opacity: 0;}
        to{opacity: 10;}
    }
    @keyframes pulse {
        0%{transform: scale(1);}
        50%{transform: scale(1.5);}
        100%{transform: scale(1);}
    }
</style>
