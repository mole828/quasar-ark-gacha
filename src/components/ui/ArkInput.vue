<template>
    <div>
        <div style="margin-bottom: 1em;">
            <div class="gift"></div>
            <a style="margin: 1em;font-size: 20px;">{{title}}</a>
        </div>
        <div style="margin: 5px;">
            <form action="#">
                <div >
                    <input
                            :placeholder="placeholder"
                            v-model="value" style="text-align: center;">
                </div>
            </form>
            <ArkButton style="margin: 5px;"
                :text="'Submit'"
                :hook="sub"
            />
        </div>
    </div>
</template>

<script>
    import ArkButton from "@/components/ui/ArkButton";
    export default {
        name: "ArkInput",
        components: {ArkButton},
        props: {
            title: String,
            placeholder: String,
            hook: Function,
        },
        data(){
            return {
                value: "",
            }
        },
        methods:{
            sub(){
                this.hook(this.value)
            },
        },
    }
</script>

<style scoped>
    .gift {
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzhJREFUeNrsmGlIVGEUhjWlRDRp+VFhi1RktElqVCRFC2RQ0GobErZAO20WElH0w9IooQUkSYKgMqigkDYqoT102iikotWw5UcrmSHT88EbjJcZ751xdOaHBx7Ue50z7/3O+c453410u90R4WztIsLcwl5gtPVCZG5ZIH5iYSGsgv5gnBTDLX8duQvmBHUFe0IBvJegIRAD2XATHsIKiA9ViCfDMujk4/5QOAgf9AAprS3wMPSCXInwZXF6EBfchUVKi6AIHAXH5HwjJFjuf4dCSILF8MzG3wgoVVoUwcBABMbqy1xK9AUKT6GH4yTLZ+rhCAyCaXDDRqhJi7XwFK5DFrR3IjBbIkp85EycHL+AU1rhRhsRzkEGjIYzutaUjYUTcNyJwNOwDZ47SI9ZWuHbMNtL2TLXZyiMJVplb/Ya1mhxbAX+hAOQrFBdc5CnI1X7zKqu81JWqmEp9IZ8+KbrVTBPtXM//HIi8DJshc4K1XgYpsSutxFqBOxViuzR355WC3mQCMMhVaFtgAmqCrYCJ8JOeKcPmKR/BDkqzDvgk43QjrABXsJJ+bBGyaXNaMrPY7gCS/wpMzH6wBO4BJnwGbar9uXIcVMWBV19dJI8LUKxlwfwu1BPgnLVuOX64lJ1ChOa85ad2qAdmab7d7z43KQ0CmonGQCHlGP5yqWrMFX39in3+sJ8qFR/3qyINJpLWrLVmSK7BV5ppdJVltZrZb6o0N9T/u6CbqEYFkzdmyshRR4DRK3qXno4DazT9TNZ3aYpG+zgf4IuMMHBaptcvajdHxXQRN2CVhXI4NqaZ5L4UOdg27EzFOa2O/lFh0jYG/gIHeC+BtuwEViiQp4hgX6XmTovfbM5ZobTGvirubLGcr+75Vxjm4MzHYxR3uyPj+sVCuNXy6Bgpug+8P9VQqUKua3Acj2paV0P/BD4u4mNYG1zK6GHuk+FZs00zZ2OdrFxelZjub9CfQ2/CR4R6gIXYAyM0+8BlZlgCE3V4StF/srkL1Pvb4JSB5sjNFGb8aiOn1k6j7RIofZXaJ2OsP30Pqa6tTqJp9ApCpXL42j5A3Zrl66Gt4Emb2TbO+o2gSG2fwIMAK1Nuo1fmpvJAAAAAElFTkSuQmCC);
        width: 1.5em;
        height: 1.5em;
        display: inline-block;
        background-size: auto 100%;
    }
    input {
        display: block;
        width: 100%;
        box-sizing: border-box;

        border: 1px black;
        padding: 0.5em 0.2em;
        color: #313131;
        font-size: 1em;
        line-height: 1em;
        line-height: normal;
        height: 1em;
        box-sizing: content-box;
        background: none;
    }
</style>