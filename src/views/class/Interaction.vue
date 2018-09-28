<template>
    <div id="inter-action">
        <div class="mt-5"></div>
        <div class="container">
            <b-container>
                <b-card class="col-md-4 col-sm-4 mb-4" v-if="this.isadding === true">
                    <b-form-group>
                        <b-form-input placeholder="제목" v-model="newInteraction.title"></b-form-input>
                        <b-form-textarea id="newInteractionValue"
                                        v-model="newInteraction.value"
                                        placeholder="내용"
                                        :rows="2"
                                        :max-rows="4"
                                        :no-resize="true"
                                        class="mb-3">
                        </b-form-textarea>
                        <div class="icons">
                            <img src="./../../assets/images.png" alt="test" @click="upload">
                            <img src="./../../assets/images.png" alt="test">
                            <img src="./../../assets/images.png" alt="test">
                            <label for="file_upload">
                                <img src="./../../assets/images.png" alt="test">
                            </label>
                            <input type="file" id="file_upload">
                            <img src="./../../assets/images.png" alt="test" @click="trash">
                        </div>
                    </b-form-group>
                </b-card>
                    <b-button class="float-right fixed-right" variant="success" @click="adding">
                        +
                    </b-button>
            </b-container>  
        </div>
    </div>    
</template>

<script>
export default {
    name: "Interaction",
    data() {
        return {
            newInteraction: {},
            isadding: true
        }
    },
    methods: {
        adding() {
            // if(this.isadding) {
            //     this.isadding = false;
            //     return;
            // }
            this.isadding = true;
        },
        trash() {
            this.isadding = false
            this.newInteraction = {}
        },
        upload() {
            alert("업로드됫네요")
            this.newInteraction = {}
        }
    }
}
</script>

<style lang="scss">
    .icons {
        img {
            display: inline-block;
            max-width: 40px;
            margin: 8px;
            cursor: pointer;
        }

        input {
            display: none;
        }
    }
</style>
