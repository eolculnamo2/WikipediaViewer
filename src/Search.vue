<template>
<div>
  <h1>
      <ul>
          <li :key="search.link" v-for="search in searchArr">
                <a :href=search.link>
                    <h1>
                        {{search.title}}
                    </h1>
                </a>
                    <h4>
                        {{search.description}}
                    </h4>
              </li>
      </ul>
  </h1>
</div>
</template>
<script>
export default {
  name: 'search',
  data(){
      return{
          searchArr: [],
          search: 'jail'
      }
  },
  methods: {
      parseApi: function(x){
          x[1].forEach((name,i)=>{

              var searchData = {
                  title: name,
                  link: x[3][i],
                  description: x[2][i]
              }
              
              this.searchArr.push(searchData)
          })
      }
  },
  mounted(){
      var uri = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+this.search+"&format=json&origin=*";
      fetch(uri)
      .then((res)=>{
          return res.json();
      })
      .then((data)=>{
          this.parseApi(data)
      })
  }
}
</script>
<style lang="sass">

</style>
