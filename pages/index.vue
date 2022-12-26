<template>
  <div class="pt-4 pb-40 md:pb-32">

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
            <div class="hover:cursor-pointer relative group overflow-hidden rounded-lg dark:border dark:border-white/10" @click="selectSound(indexo)">
              <span class="opacity-0 group-hover:opacity-100 duration-150 absolute inset-0 bg-black/50"></span>

              <NuxtImg class="w-full" provider="cloudinary" format="webp" sizes="sm:480px" quality="80" :src="audio.cover" :alt="audio.name" width="250" height="250" />

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
                <div class="flex justify-between items-start md:items-center gap-2">
                  <h2 class="md:text-lg font-bold dark:text-gray-300">{{audio.name}}</h2>

                  <button class="text-black dark:text-gray-300 hover:text-black/75 block dark:hover:text-primary duration-150" type="button" :data-hs-overlay="'#id-' + indexo + 1"><Icon name="lucide:shopping-bag" size="18"/></button>
                </div>
                <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300/75">от {{audio.artist}}</p>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-300/75">Выпущено: {{audio.date}}</p>
            </div>

            <div :id="'id-' + indexo + 1" class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
              <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                  <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                    <h3 class="font-bold text-gray-800 dark:text-white">
                      Магазины
                    </h3>
                    <button type="button" class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" :data-hs-overlay="'#id-' + indexo + 1">
                      <span class="sr-only">Close</span>
                      <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                  <div class="px-4 pt-4 pb-10 overflow-y-auto grid gap-4">
                    <!-- COVER -->
                    <div class="hover:cursor-pointer relative group overflow-hidden rounded-lg dark:border dark:border-white/10" @click="selectSound(indexo)">
                      <span class="opacity-0 group-hover:opacity-100 duration-150 absolute inset-0 bg-black/50"></span>

                      <NuxtImg provider="cloudinary" format="webp" sizes="sm:640px" quality="80" :src="audio.cover" :alt="audio.name" width="480" height="480" />

                      <!-- NEW STATUS -->
                      <span class="absolute top-3 right-3 bg-yellow-400 px-1.5 text-black rounded-full text-xs" v-if="audio.new">New</span>

                      <!-- BUTTON PLAY -->
                      <div class="absolute bottom-3 left-3">
                        <Icon v-if="state.audioPlaying[indexo]" name="ic:outline-play-circle-filled" size="40" class="text-white" />
                        <Icon v-else name="ic:outline-play-circle-filled" size="40" class="text-white opacity-0 group-hover:opacity-100 duration-150" />
                      </div>
                    </div>

                    <h4 class="text-lg font-bold dark:text-gray-300/75">Популярные</h4>
                    <div class="grid gap-4 divide-y">
                      <div class="group pt-4" v-for="(sub, index) in audio.sub" :key="index"> 
                        <NuxtLink class="flex justify-between items-center" :to="sub.url" target="_blank">
                          <div class="flex items-center gap-2">
                            <img class="w-8 shadow-lg rounded-lg" :src="sub.icon" :alt="sub.name">
                            <h2 class="dark:text-gray-300/75">{{ sub.name }}</h2>
                          </div>
                          <div v-if="sub.url">
                            <Icon class="group-hover:text-black/50 dark:group-hover:text-primary dark:text-gray-300/75" name="fluent:window-new-24-regular" size="24" />
                          </div>
                        </NuxtLink>
                      </div>
                    </div>

                    <p class="mt-2">
                      <a class="hs-collapse-toggle inline-flex items-center gap-x-2 dark:text-gray-300/75" href="javascript:;" :id="'hs-show-hide-collapse' + indexo + 1" :data-hs-collapse="'#hs-show-hide-collapse-heading-' + indexo + 1">
                        <span class="hs-collapse-open:hidden">Показать больше</span>
                        <span class="hs-collapse-open:block hidden">Показать меньше</span>
                        <svg class="hs-collapse-open:rotate-180 w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      </a>
                    </p>
                    <div :id="'hs-show-hide-collapse-heading-' + indexo + 1" class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300" :aria-labelledby="'hs-show-hide-collapse' + indexo + 1">
                      <div class="grid gap-4 divide-y dark:text-gray-300/75">
                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/spotify.svg" alt="Spotify">Spotify</div>
                        </div>

                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/pandora.svg" alt="Pandora">Pandora</div>
                        </div>

                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/iheartradio.svg" alt="IHeartRadio">IHeartRadio</div>
                        </div>

                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/napster.svg" alt="Napster">Napster</div>
                        </div>

                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/tencent.svg" alt="Tencent Music">Tencent Music</div>
                        </div>

                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/snapchat.svg" alt="Snapchat">Snapchat</div>
                        </div>

                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/7digital.svg" alt="7digital">7digital</div>
                        </div>

                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/gaana.svg" alt="Gaana">Gaana</div>
                        </div>

                        <div class="group pt-4"> 
                          <div class="flex items-center gap-2"><img class="w-8 shadow-lg rounded-lg" src="/img/store/joox.svg" alt="Joox">Joox</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>

      <!-- PLAYER -->
      <div class="shrink-0 md:w-[280px] lg:w-[320px] xl:w-[380px] hidden md:block">
        
        <div class="sticky top-24 space-y-8">
          
          <div>
            <div v-for="(audio,indexo) in audios.slice(index,index+1)" :key="indexo">
              <!-- COVER -->
              <NuxtImg class="w-full rounded-lg dark:border dark:border-white/10" provider="cloudinary" format="webp" sizes="sm:520px" quality="80" :src="audio.cover" :alt="audio.name" width="380" height="380" />

              <!-- TITLE -->
              <div class="mt-4">
                <h3 class="text-2xl font-bold dark:text-gray-300">{{audio.name}}</h3>
                <p class="text-grey dark:text-gray-300/75">{{audio.artist}}</p>
              </div>
            </div>

            <!-- CONTROLS -->
            <div class="flex justify-between items-center gap-4">
              <div class="text-grey-darker rounded-full p-1 dark:text-gray-300">
                <svg @click="random = !random" :class="random ? 'text-primary':''" class="h-8 w-8 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" /></svg>
              </div>
              <div class="text-grey-darker rounded-full p-1 dark:text-gray-300">
                <svg @click="prevButton ? previous() : ''" class="h-8 w-8 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" /></svg>
              </div>

              <div>
                <Icon v-if="!pauseTrack" @click="play()" name="ic:outline-play-circle-filled" size="64" class="text-black hover:cursor-pointer inline-block dark:text-gray-300" />
                <Icon v-else @click="pause()" name="ic:outline-pause-circle-filled" size="64" class="text-black hover:cursor-pointer inline-block dark:text-gray-300" />
              </div>

              <div class="text-grey-darker rounded-full p-1 dark:text-gray-300">
                <svg @click="nextButton ? next() : ''" class="h-8 w-8 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" /></svg>
              </div>
              <div class="text-grey-darker rounded-full p-1 dark:text-gray-300">
                <svg @click="repeat = !repeat" :class="repeat ? 'text-primary':''" class="h-8 w-8 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" /></svg>
              </div>
            </div>
          </div>

          <div class="grid gap-4">
            <div class="space-y-2">
              <p class="text-sm font-bold dark:text-gray-300/75">&copy; PsySystem Records</p>
              <p class="text-sm text-gray-600 dark:text-gray-300/75">PsySystem — это Российский лейбл звукозаписи, в основном выпускающий музыку в стиле пси-транс. Был основан в 2006 году, и является личным лейблом, где выпускаются только понравившиеся музыка, в основном это свои синглы и работы сторонних исполнителей, в большинстве своем в жанре «пси-транс».</p>
            </div>

            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-300/75">
              <a class="block" href="https://www.liveinternet.ru/click" target="_blank"><img src="https://counter.yadro.ru/logo?26.1" title="LiveInternet: показано число посетителей за сегодня" alt="" style="border:0" width="88" height="15"/></a>

              <span>Версия: 1.0.0 beta 4</span>
            </div>
          </div>

        </div>
      </div>

    </main>

    <!--
      MINI PLAYER
    -->

    <div class="miniPlayer fixed bottom-0 inset-x-0 backdrop-blur-lg bg-white/75 dark:backdrop-blur-xl dark:bg-black/50">
      <div class="container py-4 md:py-0 md:h-16 flex flex-col-reverse md:flex-row justify-between items-center gap-4">

        <div class="flex w-full md:w-auto items-center gap-4">
          <!-- COVER -->
          <div class="flex-1 flex items-center gap-2 md:gap-4" v-for="(audio,indexo) in audios.slice(index, index + 1)" :key="indexo">
            <NuxtImg class="rounded-md" provider="cloudinary" format="webp" sizes="sm:48px" quality="80" :src="audio.cover" :alt="audio.name" width="40" height="40" />

            <!-- ABOUT -->
            <div class="flex flex-col font-semibold">
              <p class="line-clamp-1 dark:text-gray-300">{{audio.name}}</p>
              <p class="text-xs text-gray-600 dark:text-gray-300/75">{{audio.artist}}</p>
            </div>
          </div>

          <!-- PLAY BUTTON -->
          <div class="shrink-0">
            <Icon v-if="!pauseTrack" @click="play()" name="ic:outline-play-circle-filled" size="40" class="text-black dark:text-gray-300 hover:cursor-pointer inline-block" />
            <Icon v-else @click="pause()" name="ic:outline-pause-circle-filled" size="40" class="text-black dark:text-gray-300 hover:cursor-pointer inline-block" />
          </div>
        </div>

        <!-- TIMER -->
        <div class="flex-1 flex items-center gap-4 w-full">
          <div class="shrink-0 w-12 hidden md:flex dark:text-gray-300">
            {{timer}}
          </div>

          <div class="flex-1 mt-1">
            <div class="relative w-full">
              <div @click="seek($event)" ref="progress" class="h-1 cursor-pointer rounded-full bg-gray-400 dark:bg-gray-300/30">
                <div class="relative flex h-1 w-full justify-end rounded-full bg-black dark:bg-gray-300" :style="{'width' : step + '%'}"></div>
              </div>
              <div class="relative flex h-1 w-full justify-end rounded-full" :style="{'width' : step + '%'}">
                <span id="progressButtonTimer" class="pin-r pin-b absolute -bottom-0 md:-bottom-0.5 h-3 w-3 rounded-full bg-black dark:bg-gray-300 md:h-4 md:w-4"></span>
              </div>
            </div>
          </div>
          
          <div class="shrink-0 w-12 hidden md:flex dark:text-gray-300">
            {{duration}}
          </div>
        </div>

        <!-- MUTE -->
        <div class="shrink-0 hidden md:flex cursor-pointer" @click="mute()">
          <Icon class="dark:text-gray-300" v-if="mutePlayer" name="fa6-solid:volume-low" size="28" />
          <Icon class="dark:text-gray-300" v-else name="fa6-solid:volume-xmark" size="28" />
        </div>

        <!-- VOLUME -->
        <div class="shrink-0 mt-1 hidden md:flex">
          <div class="relative m-auto w-40">
            <div @click="volume($event)" ref="volBar" class="bg-grey-dark relative m-auto h-1 cursor-pointer rounded-full bg-gray-400 dark:bg-gray-300/30" style="width:100%">
              <div class="relative flex h-1 justify-end rounded-full bg-black dark:bg-gray-300" :style="{'width' : volumeProgress + '%'}"></div>
            </div>
            <div class="relative flex h-1 justify-end rounded-full" :style="{'width' : volumeProgress + '%'}">
              <span id="progressButtonVolume" class="pin-r pin-b absolute -bottom-0.5 h-3 w-3 rounded-full bg-black md:h-4 md:w-4 dark:bg-gray-300"></span>
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
import audiosData from '/data/audios.json'

export default {
  mounted(){
    var sound = this.audios[this.index].howl;

      var barWidth = (0.9 * 100) / 100;
      this.sliderBtnVol = (this.volBar.offsetWidth * barWidth + this.volBar.offsetWidth * 0.05 - 25);

  },
  setup(){

      useHead({
        titleTemplate: '%s | PsySystem Records',
      })

      const audios = ref(audiosData);
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

.miniPlayer {
  padding-bottom: env(safe-area-inset-bottom,0);
}
</style>