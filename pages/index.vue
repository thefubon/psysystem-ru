<template>
  <div class="pt-6 md:pt-16 pb-32">

    <main class="container flex flex-col md:flex-row gap-4 md:gap-10 lg:gap-12 xl:gap-16">

      <!-- NEW TRACK -->
      <div class="flex-1 space-y-8">

        <!-- PLAYLIST -->
        <!-- :class="indexo == index ? 'bg-gray-100':''" -->
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8" id="journal-scroll">
          <div v-for="(audio,indexo) in audios" :key="indexo">
            
            <!-- NUMBER -->
            <div class="hidden">
              {{indexo + 1}}
            </div>
            
            <!-- COVER -->
            <div class="hover:cursor-pointer relative group overflow-hidden rounded-lg" @click="selectSound(indexo)">
              <span class="opacity-0 group-hover:opacity-100 duration-150 absolute inset-0 bg-black/50"></span>

              <NuxtImg provider="cloudinary" format="webp" sizes="sm:760px" quality="100" :src="audio.cover" :alt="audio.name" width="480" height="480" />

              <!-- NEW STATUS -->
              <span class="absolute top-3 right-3 bg-yellow-400 px-1.5 text-black rounded-full text-xs" v-if="audio.new">New</span>

              <!-- BUTTON PLAY -->
              <div class="absolute bottom-3 left-3">
                <Icon v-if="state.audioPlaying[indexo]" name="ic:outline-play-circle-filled" size="40" class="text-white" />
                <Icon v-else name="ic:outline-play-circle-filled" size="40" class="text-white opacity-0 group-hover:opacity-100 duration-150" />
              </div>
            </div>

            <div class="mt-2 grid gap-1">
              <div>
                <h2 class="text-md md:text-lg font-bold">{{audio.name}}</h2>
                <p class="text-xs md:text-sm text-gray-600">от {{audio.artist}}</p>
              </div>
              <p class="text-xs text-gray-500">Выпущено: {{audio.date}}</p>
            </div>

          </div>
        </div>
        
      </div>

      <!-- PLAYER -->
      <div class="shrink-0 md:w-[280px] lg:w-[320px] xl:w-[380px] hidden md:block">
        
        <div class="sticky top-28 space-y-16">
          
          <div>
            <div v-for="(audio,indexo) in audios.slice(index,index+1)" :key="indexo">
              <!-- COVER -->
              <NuxtImg class="md:w-[280px] lg:w-[320px] xl:w-[380px] rounded-lg" provider="cloudinary" format="webp" sizes="sm:760px" quality="80" :src="audio.cover" :alt="audio.name" width="480" height="480" />

              <!-- TITLE -->
              <div class="mt-4">
                <h3 class="text-2xl font-bold">{{audio.name}}</h3>
                <p class="text-grey">{{audio.artist}}</p>
              </div>
            </div>

            <!-- CONTROLS -->
            <div class="flex justify-between items-center gap-4">
              <div class="text-grey-darker rounded-full p-1 hover:bg-gray-300">
                <svg @click="random = !random" :class="random ? 'text-red-500':''" class="h-8 w-8 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" /></svg>
              </div>
              <div class="text-grey-darker rounded-full p-1 hover:bg-gray-300">
                <svg @click="prevButton ? previous() : ''" class="h-8 w-8 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" /></svg>
              </div>

              <div>
                <Icon v-if="!pauseTrack" @click="play()" name="ic:outline-play-circle-filled" size="64" class="text-black hover:cursor-pointer inline-block" />
                <Icon v-else @click="pause()" name="ic:outline-pause-circle-filled" size="64" class="text-black hover:cursor-pointer inline-block" />
              </div>

              <div class="text-grey-darker rounded-full p-1 hover:bg-gray-300">
                <svg @click="nextButton ? next() : ''" class="h-8 w-8 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" /></svg>
              </div>
              <div class="text-grey-darker rounded-full p-1 hover:bg-gray-300">
                <svg @click="repeat = !repeat" :class="repeat ? 'text-red-500':''" class="h-8 w-8 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" /></svg>
              </div>
            </div>
          </div>

          <div class="grid gap-4">
            <div class="space-y-2">
              <p class="text-sm font-bold">&copy; PsySystem Records</p>
              <p class="text-sm text-gray-600">PsySystem — это Российский лейбл звукозаписи, в основном выпускающий музыку в стиле пси-транс. Был основан в 2006 году, и является моим личным лейблом, где выпускает только понравившиеся мне музыка, в основном это свои синглы и работы сторонних исполнителей, в большинстве своем в жанре «пси-транс».</p>
            </div>
            <a class="block" href="https://www.liveinternet.ru/click" target="_blank"><img src="https://counter.yadro.ru/logo?26.1" title="LiveInternet: показано число посетителей за сегодня" alt="" style="border:0" width="88" height="15"/></a>
          </div>

        </div>
      </div>

    </main>

    <!-- MINI PLAYER -->

    <div class="bg-white border-t fixed bottom-0 inset-x-0">
      <div class="container py-4 md:py-0 md:h-16 flex flex-col-reverse md:flex-row justify-between items-center gap-4">

        <div class="flex w-full md:w-auto items-center gap-4">
          <!-- COVER -->
          <div class="flex-1 flex items-center gap-2 md:gap-4" v-for="(audio,indexo) in audios.slice(index, index + 1)" :key="indexo">
            <NuxtImg class="rounded-md" provider="cloudinary" format="webp" sizes="sm:80px" quality="80" :src="audio.cover" :alt="audio.name" width="40" height="40" />

            <!-- ABOUT -->
            <div class="flex flex-col font-semibold">
              <p class="line-clamp-1">{{audio.name}}</p>
              <p class="text-xs text-gray-600">{{audio.artist}}</p>
            </div>
          </div>

          <!-- PLAY BUTTON -->
          <div class="shrink-0">
            <Icon v-if="!pauseTrack" @click="play()" name="ic:outline-play-circle-filled" size="40" class="text-black hover:cursor-pointer inline-block" />
            <Icon v-else @click="pause()" name="ic:outline-pause-circle-filled" size="40" class="text-black hover:cursor-pointer inline-block" />
          </div>
        </div>

        <!-- TIMER -->
        <div class="flex-1 flex items-center gap-4 w-full">
          <div class="shrink-0 w-12 hidden md:flex">
            {{timer}}
          </div>

          <div class="flex-1 mt-1">
            <div class="relative w-full">
              <div @click="seek($event)" ref="progress" class="h-1 cursor-pointer rounded-full bg-gray-200">
                <div class="relative flex h-1 w-full justify-end rounded-full bg-black" :style="{'width' : step + '%'}"></div>
              </div>
              <div class="relative flex h-1 w-full justify-end rounded-full" :style="{'width' : step + '%'}">
                <span id="progressButtonTimer" class="pin-r pin-b absolute -bottom-0 md:-bottom-0.5 h-3 w-3 rounded-full bg-black md:h-4 md:w-4"></span>
              </div>
            </div>
          </div>
          
          <div class="shrink-0 w-12 hidden md:flex">
            {{duration}}
          </div>
        </div>

        <!-- MUTE -->
        <div class="shrink-0 hidden md:flex" @click="mute()">
          <Icon v-if="mutePlayer" name="fa6-solid:volume-low" size="28" />
          <Icon v-else name="fa6-solid:volume-xmark" size="28" />
        </div>

        <!-- VOLUME -->
        <div class="shrink-0 mt-1 hidden md:flex">
          <div class="relative m-auto w-40">
            <div @click="volume($event)" ref="volBar" class="bg-grey-dark relative m-auto h-1 cursor-pointer rounded-full bg-gray-200" style="width:100%">
              <div class="relative flex h-1 justify-end rounded-full bg-black" :style="{'width' : volumeProgress + '%'}"></div>
            </div>
            <div class="relative flex h-1 justify-end rounded-full" :style="{'width' : volumeProgress + '%'}">
              <span id="progressButtonVolume" class="pin-r pin-b absolute -bottom-0.5 h-3 w-3 rounded-full bg-black md:h-4 md:w-4"></span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
/*
import Track21 from "/music/fun-at-noise.mp3";
*/

import { Howl, Howler } from 'howler';
export default {
  mounted(){
    var sound = this.audios[this.index].howl;

      var barWidth = (0.9 * 100) / 100;
      this.sliderBtnVol = (this.volBar.offsetWidth * barWidth + this.volBar.offsetWidth * 0.05 - 25);

  },
  setup(){

      useHead({
        titleTemplate: '%s | Музыка',
      })

      const audios = ref([
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1669392375/music/time-for-freedom.mp3",
          name: "Time For Freedom",
          artist: "TheFubon",
          date: "25.11.2022",
          cover: "/cover/time-for-freedom.png",
          new: true,
          howl: null,
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1669737299/music/flying-phoenix.mp3",
          name: "Flying Phoenix",
          artist: "TheFubon",
          date: "25.11.2022",
          cover: "/cover/flying-pohenix.png",
          new: true,
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454140/music/fun-at-noise.mp3",
          name: "Fun At Noise",
          artist: "TheFubon",
          date: "11.11.2022",
          cover: "/cover/fun-at-noise.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454139/music/soul-of-space.mp3",
          name: "Soul of Space",
          artist: "TheFubon",
          date: "11.11.2022",
          cover: "/cover/soul-of-space.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454185/music/quantum.mp3",
          name: "Quantum",
          artist: "TheFubon",
          date: "24.09.2022",
          cover: "/cover/quantum.jpg",
          howl: null
        },
         {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454149/music/under-the-stars.mp3",
          name: "Under The Stars",
          artist: "TheFubon",
          date: "24.09.2022",
          cover: "/cover/under-the-stars.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454144/music/until.mp3",
          name: "Until",
          artist: "TheFubon",
          date: "16.09.2022",
          cover: "/cover/until.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454168/music/retrospective.mp3",
          name: "Retrospective",
          artist: "TheFubon",
          date: "16.09.2022",
          cover: "/cover/retrospective.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454171/music/deeper-house.mp3",
          name: "Deeper House",
          artist: "TheFubon",
          date: "16.09.2022",
          cover: "/cover/deeper-house.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454154/music/your-love.mp3",
          name: "Your Love",
          artist: "TheFubon",
          date: "11.07.2022",
          cover: "/cover/your-love.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454184/music/where-did-you-go.mp3",
          name: "Where Did You Go",
          artist: "TheFubon",
          date: "08.07.2022",
          cover: "/cover/where-did-you-go.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454199/music/feelings-of-youth.mp3",
          name: "Feelings of Youth",
          artist: "TheFubon",
          date: "13.02.2021",
          cover: "/cover/feelings-of-youth.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454189/music/sunset-extented-version.mp3",
          name: "SunSet (Extended)",
          artist: "TheFubon",
          date: "09.02.2021",
          cover: "/cover/sunset-extended-version.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454166/music/by-my-side.mp3",
          name: "By My Side",
          artist: "yagelProject",
          date: "01.05.2020",
          cover: "/cover/by-my-side.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454176/music/prey.mp3",
          name: "Prey",
          artist: "yagelProject",
          date: "25.09.2019",
          cover: "/cover/prey.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454196/music/sunset.mp3",
          name: "SunSet",
          artist: "yagelProject",
          date: "23.08.2019",
          cover: "/cover/sunset.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454148/music/atmosphere.mp3",
          name: "Atmosphere",
          artist: "yagelProject",
          date: "16.08.2019",
          cover: "/cover/atmosphere.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454122/music/big-tree.mp3",
          name: "Big Tree",
          artist: "yagelProject",
          date: "12.08.2019",
          cover: "/cover/big-tree.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454172/music/eximinds-trance.mp3",
          name: "Eximinds Trance",
          artist: "yagelProject",
          date: "08.08.2019",
          cover: "/cover/eximinds-trance.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454165/music/mama-ya-tancuyu.mp3",
          name: "Мама, Я Танцую",
          artist: "#2Маши & yagelProject",
          date: "17.07.2019",
          cover: "/cover/mama-ya-tancuyu.jpg",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454145/music/black-beach.mp3",
          name: "Black Beach",
          artist: "yagelProject",
          date: "28.12.2019",
          cover: "/cover/black-beach.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454147/music/tichaya-pravda.mp3",
          name: "Тихая правда",
          artist: "Перекати поле",
          date: "20.07.2015",
          cover: "/cover/tichaya-pravda.png",
          howl: null
        },
        {
          file: "https://res.cloudinary.com/drjdwwxf7/video/upload/v1668454205/music/teachers-preach.mp3",
          name: "Teacher's Preach",
          artist: "yagelProject",
          date: "11.06.2013",
          cover: "/cover/teachers-preach.png",
          howl: null
        },
      ]);

      const step =  ref(0);
      const nextButton = ref(true);
      const prevButton = ref(true);
      const random = ref(false);
      const repeat = ref(false);
      const index = ref(0);
      const duration = ref('00:00');
      const timer = ref('00:00');
      const pauseTrack = ref(false);
      const progress = ref(null);
      const volBar = ref(null);
      const sliderBtn = ref(0);
      const sliderBtnVol = ref(null);
      const volumeProgress = ref(90);
      const mutePlayer = ref(false);
      const state = reactive({
          audioPlaying: []
      })
      
      function formatTime(secs) {
          var minutes = Math.floor(secs / 60) || 0;
          var seconds = Math.floor(secs - minutes * 60) || 0;
          return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }
      function play(){
          var sound;

          var audio = audios.value[index.value];
          if (audio.howl) {
              sound = audio.howl
          }else{
              state.audioPlaying[index.value] = false;
              sound = audio.howl =  new Howl({
              src: [audio.file],
              html5: true, // A live stream can only be played through HTML5 Audio.
              format: ['mp3', 'aac'],
              onplay: function(){
                  pauseTrack.value = true;
                  nextButton.value = true;
                  prevButton.value = true;
                  duration.value = formatTime(sound.duration());
                  requestAnimationFrame(stepFunction.bind(this));

              },
              onpause: function(){
                  pauseTrack.value = false;

              },
              onend: function() {

                  next();
              },
              onseek: function(){
                window.requestAnimationFrame(stepFunction.bind(this));

              }
              });
          }

          sound.play();
          state.audioPlaying[index.value] = true;

      }
      function pause(indexo){

          var audio = audios.value[index.value].howl;
          if (audio) {
              audio.pause();
              pauseTrack.value = false;
              state.audioPlaying[index.value] = false;
          }

      }
      function stepFunction(){

          var sound = audios.value[index.value].howl;
          var seek = sound.seek();
          timer.value = formatTime(Math.round(seek));
          step.value = (seek * 100) / sound.duration();

          sliderBtn.value = (progress.value.offsetWidth * (step.value/100) + progress.value.offsetWidth * 0.05 - 25);

          if (sound.playing()) {
              window.requestAnimationFrame(stepFunction.bind(this));
          }

      }
      function seek(event){
          var per =  event.offsetX / progress.value.clientWidth;

          var sound = audios.value[index.value].howl;

          if (sound) {
              if (sound.playing()) {
                  sound.pause();
                  sound.seek(sound.duration() * per);
                  var barWidth = (per * 100) / 100;
                  sliderBtn.value = (progress.value.offsetWidth * barWidth + progress.value.offsetWidth * 0.05 - 25);
                  sound.play();
              }else{

                  sound.seek(sound.duration() * per);
                  var barWidth = (per * 100) / 100;
                  sliderBtn.value = (progress.value.offsetWidth * barWidth + progress.value.offsetWidth * 0.05 - 25);
              }


          }
      }
      function next() {
          nextButton.value = false;
          var audio = audios.value[index.value].howl;

          state.audioPlaying[index.value] = false;
          mutePlayer.value ? mutePlayer.value = false : '';
          audio && audio.mute(true) ?  audio.mute(false) : '';


          if ( audio && audios.value.length - 1 ==  index.value) {
              audio.stop();
              repeat.value ? index.value = index.value
              :
              random.value ? index.value = Math.floor(Math.random() * audios.value.length)

              : index.value = 0


          }else{

              if (audio) {
                  audio.stop();

              }
              repeat.value ? index.value = index.value
              :
              random.value ? index.value = Math.floor(Math.random() * audios.value.length)
              :
              index.value ++;


          }

          play();

      }
      function previous() {
          var audio = audios.value[index.value].howl;
          prevButton.value = false;
          state.audioPlaying[index.value] = false;
          mutePlayer.value ? mutePlayer.value = false : '';
          audio && audio.mute(true) ?  audio.mute(false) : '';
          if (!audio) {

              index.value = audios.value.length - 1;

          }else if (audio && index.value == 0) {
              audio.stop();
              repeat.value ? index.value = index.value
              :
              random.value ? index.value = Math.floor(Math.random() * audios.value.length)

              : index.value = audios.value.length - 1;
          }
          else if(audio){


              audio.stop();

              repeat.value ? index.value = index.value
              :
              random.value ? index.value = Math.floor(Math.random() * audios.value.length)

              : index.value --;


          }


          play();
      }
      function selectSound(indexSelected) {
          var audio = audios.value[index.value].howl;

          if (audio) {
              audio.stop();
              state.audioPlaying[index.value] = false;
          }
          index.value = indexSelected;

          play();

      }
      function volume(event){

          var per = event.layerX / parseFloat(volBar.value.scrollWidth);
          var barWidth = (per * 100) / 100;
          volumeProgress.value = barWidth * 100;
          sliderBtnVol.value = (volBar.value.offsetWidth * barWidth + volBar.value.offsetWidth * 0.05 - 25);
          Howler.volume(per);
      }
      function mute() {

          var audio = audios.value[index.value].howl;

          if (audio) {
              mutePlayer.value  = !mutePlayer.value;

              mutePlayer.value ? audio.mute(true) : audio.mute(false)
          }

      }

      return{
          play,pause,duration,formatTime,audios,pauseTrack,next,previous,
          index,timer,step,stepFunction,seek,selectSound,state,random,repeat,
          progress,volume,volBar,volumeProgress,sliderBtn,mute,mutePlayer,
          sliderBtnVol,nextButton,prevButton
      }
  }
}
</script>

<style>
#progressButtonTimer,
#progressButtonVolume {
  margin-top:-9px;
  right:-8px;
}
</style>