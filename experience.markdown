---
layout: default
title: Experience
---

<div class="article-header">
    <h1>Experience</h1>
    <p class="resume-link">If you'd like to know more about my Experience, feel free to check out my <a href="https://drive.google.com/file/d/17_OcWPUZzgXXDw72a5cCwfLD0KBlBnYb/view?usp=sharing" class="inline-link" target="_blank">resume</a>!</p>
</div>

<div class="article-content">
    <section class="section-block">
        <h2>Education</h2>
        <div class="experience-item">
            <h3>University of Illinois Urbana-Champaign</h3>
            <div class="experience-meta">Jan 2026 - Dec 2026</div>
            <div class="experience-role">Masters of Computer Science</div>
            <p>Coursework: Immersive Computing Systems, Multimedia Systems, Machine Learning for Signal Processing,
Distributed Systems, Virtual Reality</p>
            <div class="experience-meta">Aug 2022 - Dec 2025</div>
            <div class="experience-role">Bachelors of Science in Computer Science + Music</div>
            <p>Coursework: Artificial Intelligence, Algorithms, Computer Architecture, Data Structures, Audio Processing Technology, Computation and Music, Electroacoustics</p>
        </div>
    </section>

    <section class="section-block">
        <h2>Work Experience</h2>

        <div class="experience-item">

            <h3>Shure</h3>
            <div class="experience-meta">May 2026 – Aug 2026</div>
            <div class="experience-role">Cloud Software Developer Intern</div>
            <p>
                Work in progress!
            </p>
        </div>

        <div class="experience-item">
            <h3>Amazon</h3>
            <div class="experience-meta">May 2025 – Aug 2025</div>
            <div class="experience-role">Software Developer Intern</div>
            <p>
                During my internship with Amazon in Seattle, I built a full end-to-end machine-learning model testing system for an internal SageMaker tool. 
                This let data scientists validate fraud-detection models directly in production without committing code, cutting development time roughly in half. 
                I also designed a secure cross-account deployment architecture that used UUID authentication, Java APIs, Python wrappers, and AWS services such as S3, DynamoDB, and Step Functions to automate model deployment workflows. 
                To support it all, I engineered an automated pipeline for Python packaging, secure uploads, and CloudWatch monitoring.
            </p>
        </div>


        <div class="experience-item">
            <h3>Binaural Hearing Lab</h3>
            <div class="experience-meta">Mar 2025 - Aug 2025</div>
            <div class="experience-role">Undergraduate Research Assistant</div>
            <p>
            At the Binaural Hearing Lab, I contributed to the development of the CCi-Mobile cochlear implant research platform. My work focused on enhancing signal processing modules in MATLAB, particularly for generating electrodograms used in auditory experiments. I implemented and refined functions within the Advanced Combination Encoder (ACE) strategy, including audio preprocessing, automatic gain control, and FFT-based filterbanks. I also supported GUI development and real-time hardware streaming through an RF interface, enabling real-time stimulation for auditory research conducted under Dr. Justin Aranoff.
            </p>

        </div>

        <div class="experience-item">
            <h3>COUNTRY Financial</h3>
            <div class="experience-meta">Jan 2024 - Dec 2024</div>
            <div class="experience-role">Software Developer Intern</div>
            <p>At COUNTRY Financial, I worked on a variety of impactful projects. I designed and implemented a Retrieval-Augmented Generation (RAG) system using Azure OpenAI and semantic chunking to improve how insurance policy information is retrieved. I also developed a proof of concept to migrate GitLab CI/CD runners to an Azure Kubernetes cluster, exploring cloud migration options while improving scalability. Along the way, I wrote unit tests to achieve 80% code coverage in the Ingestion & Curation Pipelines, helping ensure the reliability of the codebase. I automated routine tasks with the Qualys API, saving several hours each week, and collaborated with my team in an Agile environment, participating in daily standups and sprint planning.</p>
        </div>

        <div class="experience-item">
            <h3>National Center for Supercomputing Applications</h3>
            <div class="experience-meta">Aug 2024 - Mar 2025</div>
            <div class="experience-role">Undergraduate Research Assistant</div>
            <p>I collaborated on the DISSCO project under Dr. Sever Tipei, focusing on enhancing software for musical composition, sound synthesis, and notation. Using C++ and high-performance computing, I’ve worked on improving the system's capabilities and implementing statistically-driven applications of musical features within the composition module.</p>
        </div>
    </section>

    <section class="section-block">
        <h2>Projects</h2>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/Fractured-Double" target="_blank" rel="noopener noreferrer">Fractured Double</a> | Senior Capstone</h3>
            <div class="experience-meta">Aug - Dec 2025</div>
            <p>Fractured Double is a real-time audio effect that reimagines traditional doubling using granular synthesis. The plugin breaks incoming audio into short grains and reconstructs them into two pitch-shifted "ghost" voices, with controlled randomness in pitch and timing to create width and texture without sounding mechanical. Built in C++ using the JUCE framework, I implemented the full DSP pipeline including circular buffering, grain scheduling, Hann windowing, and playback-rate-based pitch shifting. User-adjustable parameters for pitch depth, jitter, and wet/dry mix make the effect flexible enough for subtle vocal widening or more experimental, ambient sound design.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/CS-534-Research" target="_blank" rel="noopener noreferrer">Offloaded Spatial Audio Rendering for XR</a> | CS 534: Immersive Computing Systems</h3>
            <div class="experience-meta">Jan - May 2026</div>
            <p>Studied the tradeoffs of offloading a scene-aware spatial audio pipeline for XR headsets to a nearby GPU server. The pipeline estimates room geometry, classifies surface materials using semantic segmentation, and synthesizes a Room Impulse Response (RIR) for binaural rendering. Profiled four offloading configurations across two device platforms (MacBook M1 Air and NVIDIA Jetson Orin AGX) and a GPU workstation, measuring per-stage latency, network bandwidth, and audio quality via T60 comparison against ScanNet ground-truth RIRs. Found that material segmentation dominates device-side cost and that offloading replaces compute overhead with network overhead on capable hardware. On the Jetson, where local segmentation takes 530ms, offloading reduced update latency by 2.7x and board power by 25%.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/CS-537-Research" target="_blank" rel="noopener noreferrer">Bandwidth-Efficient Keyword Spotting</a> | CS 537: Multimedia Systems</h3>
            <div class="experience-meta">Jan - May 2026</div>
            <p>Designed and evaluated five feature-level transmission strategies for a split-inference keyword spotting pipeline, where audio is captured on a constrained edge device and classified on a remote server. Strategies ranged from raw PCM audio to a jointly-trained neural encoder producing compact learned embeddings. Deployed all five approaches end-to-end over a real TCP network on CloudLab nodes and benchmarked them across accuracy, bandwidth, round-trip latency, and compute cost (MFLOPs) on both device and server using the Google Speech Commands v2 dataset. Results showed no single strategy dominates across all deployment constraints, providing practical guidance for engineers navigating the bandwidth-latency-accuracy tradeoff in IoT voice systems.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/PillaiFanClub/Ladidadidaaaa" target="_blank" rel="noopener noreferrer">Arcade Karaoke</a> | AWS Award Winner @ Hack@Brown 2025</h3>
            <div class="experience-meta">Feb 2025</div>
            <p>As part of a collaborative project, I developed a multiplayer web-based karaoke game that allows players to join remotely using their phones. I implemented post-performance pitch analysis using Dynamic Time Warping (DTW) and librosa for pitch detection, along with a caching system to pre-process reference vocals for faster analysis. Built with React, Express, Python, and WebSockets, the game ensures seamless host-player interactions and real-time audio analysis.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/ekcom/GeoGroove" target="_blank" rel="noopener noreferrer">GeoGroove</a> | Skillful Execution Award @ UIUC Research Park Hackathon 2024</h3>
            <div class="experience-meta">June 2024</div>
            <p>I worked on GeoGroove, a location-based music discovery tool that curates personalized Spotify playlists based on geographic regions. My role focused on implementing Spotify authentication to ensure seamless playlist creation and integration. The system leverages MusicBrainz to extract representative artists and uses Spotify’s API to rank them by popularity and fetch top tracks. Built with Python and Flask, GeoGroove enhances cultural immersion through music by allowing users to explore popular artists from specific locations.</p>
        </div>

        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/Custom-Calendar" target="_blank" rel="noopener noreferrer">UIUC Custom Calendar</a> | CS 222: Software Design Lab</h3>
            <div class="experience-meta">Aug 2023 - Dec 2023</div>
            <p>As part of a collaborative project, I worked on developing an integrated interface that consolidates assignment deadlines from Canvas and PrairieLearn, using Flask, Selenium, and React. I also implemented an automated assignment data import system tailored specifically for UIUC students, streamlining their workflow and making it easier to track and manage deadlines.</p>
        </div>
    </section>
</div>