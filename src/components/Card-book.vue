<template>
    <div>
        <div class="book-card">
            <router-link :to="{path: `/book/${id}`}"><img :src="image" :alt="name" class="book-card__img"></router-link>
            <h4 class="book-card__name"><router-link :to="{path: `/book/${id}`}">{{name}}</router-link></h4>
            <p class="book-card__description">{{description | truncate(200, '...')}}</p>
            <span class="book-card__author">Автор: <b>{{author}}</b></span>
            <span class="book-card__year">Год: {{year}}</span>
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
            category_id: Number
        },
        filters: {
            truncate: function (text, length, suffix) {
                return text.substring(0, length) + suffix;
            },
        }
    }
</script>

<style lang="scss">
    .book-card {
        &__img {
            width: 100%;
            height: 350px;
            object-fit: cover;
            display: inline-box;
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
</style>