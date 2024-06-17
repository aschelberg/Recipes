<script setup>
import useUserStore from '@/stores/user.store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  UserIcon,
  ListBulletIcon,
  XMarkIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline';
import { ChevronDownIcon, ChevronUpIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/vue/20/solid'

const route = useRoute();
const { user } = storeToRefs(useUserStore());

const navigation = ref([
  { name: 'Recipes', href: '/recipes', icon: HomeIcon },
  { name: 'Saved Recipes', href: '/myrecipes', icon: FolderIcon },
  { name: 'Shopping List', href: '/shoppinglist', icon: ListBulletIcon },
  { name: 'Ingredients', href: '/ingredients', icon: InformationCircleIcon },
  // { name: 'Calendar', href: '#', icon: CalendarIcon },
  // { name: 'Documents', href: '#', icon: DocumentDuplicateIcon },
])
// const teams = ref([
//   { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
//   { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
//   { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
// ])
const userNavigation = [
  { name: 'Sign out', href: '/logout' },
]

const sidebarOpen = ref(false)
</script>

<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500" alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <RouterLink :to="item.href" :class="[route.path === item.href ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']" :aria-current="route.path === item.href ? 'page': undefined">
                            <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </RouterLink>
                        </li>
                      </ul>
                    </li>

                    <!-- TEAMS - Save this for after all other pages and functionality is completed -->
                    <!-- <li>
                      <div class="text-xs font-semibold leading-6 text-gray-400">Your groups</div>
                      <ul role="list" class="-mx-2 mt-2 space-y-1">
                        <li v-for="team in teams" :key="team.name">
                          <a :href="team.href" :class="[team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{{ team.initial }}</span>
                            <span class="truncate">{{ team.name }}</span>
                          </a>
                        </li>
                      </ul>
                    </li> -->
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 bg-gray-900 px-6">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500" alt="Your Company" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <RouterLink :to="item.href" :class="[route.path === item.href ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']" :aria-current="route.path === item.href ? 'page': undefined">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </RouterLink>
                </li>
              </ul>
            </li>

            <!-- Save this for after all other pages and functionality is put together -->
            <!-- <li> 
              <div class="text-xs font-semibold leading-6 text-gray-400">Your groups</div>
              <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li v-for="team in teams" :key="team.name">
                  <a :href="team.href" :class="[team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{{ team.initial }}</span>
                    <span class="truncate">{{ team.name }}</span>
                  </a>
                </li>
              </ul>
            </li> -->
            <!-- Sidebar nav user menu -->
            <li class="-mx-6 mt-auto">
              <Menu as="div" class="relative hover:bg-gray-800">
                <MenuButton class="-m-1.5 flex items-center p-1.5 ">
                  <span class="sr-only">Open user menu</span>
                  <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white ">
                    <UserIcon v-if="!user.photoURL" class="h-6 w-6 rounded-full border border-white" />
                    <img v-else class="h-8 w-8 rounded-full bg-green-700" :src="`${user.photoURL}`"/>
                    <span class="sr-only">Your profile</span>
                    <span aria-hidden="true">{{ user.displayName }}</span>
                    <ChevronUpIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                  </a>
                </MenuButton>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute offset-0 -top-12 right-1 z-10 mt-2.5 w-32 origin-bottom-right bg-white rounded-md py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <RouterLink :to="item.href" :class="[active ? 'bg-gray-200' : '', 'flex  px-3 py-1 text-sm leading-6 text-gray-900', 'justify-between']">
                        <span  class="pr-1">{{ item.name }}</span>
                        <ArrowRightStartOnRectangleIcon class="h-5 w-5"/>
                      </RouterLink>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" class="-m-2.5 p-2.5 text-gray-400 lg:hidden" @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
      <Menu as="div" class="relative">
        <MenuButton class="-m-1.5 flex items-center p-1.5 hover:bg-gray-800 hover:rounded-md">
          <span class="sr-only">Open user menu</span>
          <UserIcon v-if="!user.photoURL" class="h-6 w-6 rounded-full text-white border border-white" />
          <img v-else class="h-8 w-8 rounded-full bg-gray-50" :src="`${user.photoURL}`" alt="" />
          <ChevronDownIcon class="h-6 w-6 text-white pl-2"/>
          <span class="hidden lg:flex lg:items-center">
            <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{ user.displayName }}</span>
            <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </MenuButton>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
              <RouterLink :to="item.href" :class="[active ? 'bg-gray-200' : '', 'flex px-3 py-1 text-sm leading-6 text-gray-900 justify-between']">
                <span  class="pr-1">{{ item.name }}</span>
                <ArrowRightStartOnRectangleIcon class="h-5 w-5"/>
              </RouterLink>
              
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <header class="inline lg:pl-72 bg-white shadow-sm w-full">
      <div class="lg:pl-80 px-4 sm:px-6 lg:px-8 py-2 mx-auto max-w-7xl">
        <h1
          class="flex justify-center py-10 text-3xl font-semibold leading-6 text-gray-600 border-b-2"
        >
          {{ route.meta.title !== 'Recipe View' ? route.meta.title : route.params.name.toUpperCase() }}
        </h1>
      </div>
    </header>

    <main class="inline lg:pl-72">
      <div class="lg:pl-80 px-6 sm:px-6 lg:px-8 py-4">
        <slot />
      </div>
      <!-- <footer
        aria-labelledby="footer-heading"
        class="absolute w-full bottom-0 border-t border-gray-200 bg-white lg:pl-72"
      >
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="border-t border-gray-100 py-10 text-center">
            <p class="text-sm text-gray-500">
              &copy; 2024 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer> -->
    </main>
    
  </div>
</template>