import React from 'react'
import Navbar from '../components/Navbar'

const About = () => {
  return (
    <div className="w-full h-auto">
        <Navbar link='about' />
        <div className="w-full flex items-center justify-center text-gray-700 p-4">
        <div className="w-[80%] flex flex-col sm:flex-row items-center p-4 shadow-xl  rounded-lg bg-white mt-4 sm:mt-2 gap-10 max-h-[80vh] overflow-y-auto sm:overflow-hidden">
                <div className="about sm:w-[60%]  flex flex-col p-2 gap-4 ">
                    <div className="text-3xl font-bold items-start flex flex-col mb-4 text-gray-700 ">A propos</div>
                    <div className="text-md w-[95%]">
                        Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. 
                        Et labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint aliqua anim 
                        nulla sunt mollit id pariatur in voluptate cillum. Eu voluptate tempor esse minim amet fugiat 
                        veniam occaecat aliqua.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, minima repellendus culpa facilis
                        voluptas doloremque eligendi. Expedita quisquam porro delectus, saepe veritatis praesentium
                        doloremque. Suscipit architecto distinctio nihil itaque voluptatem.
                        Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. 
                        Et labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint aliqua anim 
                        nulla sunt mollit id pariatur in voluptate cillum. Eu voluptate tempor esse minim amet fugiat 
                        veniam occaecat aliqua.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, minima repellendus culpa facilis
                        Lorem ipsum dolor sit amet .
                    </div>
                </div>

                <div className="w-[100%] md:w-[60%] p-2">
                    <div className="text-3xl font-bold items-start flex flex-col mb-4 ">Contactez-nous</div>
                    <form action="#" class="space-y-4">
                        <div>
                            <label for="email" classNaùe="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                            <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@cdnorg.com" required />
                        </div>
                        <div>
                            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sujet</label>
                            <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Comment pouvons vous aidez ?" required />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Message</label>
                            <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Laisser un commentaire..."></textarea>
                        </div>
                        <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-500 sm:w-fit hover:bg-blue-700  focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
