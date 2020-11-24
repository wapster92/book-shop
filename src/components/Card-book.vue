<template>
    <div>
        <div class="book-card">
            <img :src="image" :alt="name" class="book-card__img">
            <h4 class="book-card__name" v-html="$options.filters.highlight(name, search)">{{name}}</h4>
            <p class="book-card__description" v-html="$options.filters.highlight(description, search)">{{description}}</p>
            <span class="book-card__author" v-html="$options.filters.highlight(year, search)">Автор: <b>{{year}}</b></span>
            <span class="book-card__year" v-html="$options.filters.highlight(year, search)">Год: {{year}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card-book',
        props: {
            id: Number,
            name: String,
            description: String,
            author: String,
            year: String,
            image: String,
            category_id: Number,
            search: String
        },
        filters: {
            highlight: function(word, query) {
                const check = new RegExp(query.toLowerCase(), "ig");
                return word.toString().replace(check, function(matchedText){
                    return ('<strong class="search-word">' + matchedText + '</strong>');
                });
            }
        }
    }
</script>

<style lang="scss">
    .book-card {
        &__img {

        }
        &__name {
            margin: .5em 0;
        }
        &__description {
            font-size: 14px;
            margin: .5em 0;
        }
        &__author {
            font-size: 16px;
            display: flex;
            margin-bottom: 5px;
        }
    }
    .search-word {
        color: var(--red);
        background: yellow;
    }
</style>