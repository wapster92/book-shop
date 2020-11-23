<template>
    <div>
        <div class="book">
            <img :src="book.image" alt="" class="book__img">
            <h4 class="book__name">{{book.name}}</h4>
            <p class="book__description">{{book.description}}</p>
            <h5>{{book.author}}</h5>
            <span>{{book.year}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Book',
        computed: {
            books() {
                return this.$store.state.books
            },
            book() {
                return this.books.find(el => {
                    if(el.id === Number(this.$route.params.id)) {
                        return el
                    }
                })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>