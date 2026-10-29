---
layout: default
title: Experience
---

<div class="article-header">
    <h1>Experience</h1>
    <p class="resume-link">If you'd like to know more about my Experience, feel free to check out my <a href="https://drive.google.com/file/d/1Gwtjnw7BCmO569T0ujaccMoztYSGO4aZ/view?usp=sharing" class="inline-link" target="_blank">resume</a>!</p>
</div>

<div class="article-content">
    <section class="section-block">
        <h2>Education</h2>
        <div class="experience-item">
            <h3>University of Illinois Urbana-Champaign</h3>
            <div class="experience-meta">Jan 2026 - Dec 2026</div>
            <div class="experience-role">Master of Computer Science</div>
            <p>Coursework: Immersive Computing Systems, Multimedia Systems, Machine Learning for Signal Processing, Distributed Systems, Parallel Programming, Virtual Reality, Issues of Law &amp; Policy in CS</p>
            <div class="experience-meta">Aug 2022 - Dec 2025</div>
            <div class="experience-role">Bachelor of Science in Computer Science + Music, High Honors (GPA: 3.82)</div>
            <p>Core Coursework: Data Structures, Algorithms, Computer Architecture, Computer Systems, Database Systems, Artificial Intelligence</p>
            <p>Audio Coursework: Audio Computing Lab, Electronic Music Synthesis, Computation and Music I–III, Electronic Music Techniques I–II</p>
        </div>
    </section>

    <section class="section-block">
        <h2>Work Experience</h2>

        <div class="experience-item">
            <h3>Amazon</h3>
            <div class="experience-meta">Sep 2026 – Present</div>
            <div class="experience-role">Software Developer Intern</div>
            <p>
                I'm back at Amazon, this time in San Diego, building an end-to-end system that turns red-team findings against Amazon's fraud-detection models into live production monitoring, designed to alert the ML team within hours instead of after a week or more of manual analysis.
                I'm adding an observe-only step to the real-time fraud detection service that matches traffic against known weakness patterns after the response is sent, so customers see no added latency.
                New patterns go live without a deploy through an ingestion pipeline I'm building in Kotlin and AWS CDK (Lambda, S3, DynamoDB, AppConfig), which validates each pattern and provisions its own CloudWatch alarm.
                I wrote the design doc, co-designed a structured pattern schema with the ML team to replace prose-only findings, and am building a TypeScript dashboard that shows each pattern's match rate and alarm state.
            </p>
        </div>

        <div class="experience-item">
            <h3>Shure</h3>
            <div class="experience-meta">May 2026 – Aug 2026</div>
            <div class="experience-role">Software Developer Intern</div>
            <p>
                At Shure, I worked on the serverless backend behind Shure's cloud account management (users, user groups, roles, permissions, organizations, registration, and more), made up of nine TypeScript/NestJS microservices in an Nx monorepo.
                I automated their AWS CloudFormation deployments, cutting deployment time by 80%.
                I also standardized dead-letter queue handling across the platform's microservices (AWS SQS, EventBridge, Lambda), so every failed event is captured for automated retry and auditing instead of being silently lost.
            </p>
        </div>

        <div class="experience-item">
            <h3>Amazon</h3>
            <div class="experience-meta">May 2025 – Aug 2025</div>
            <div class="experience-role">Software Developer Intern</div>
            <p>
                During my first internship with Amazon in Seattle, I built a full end-to-end machine-learning model testing system for an internal SageMaker tool.
                This let data scientists validate fraud-detection models directly in production without committing code, cutting development time roughly in half.
                I also built a cross-account authentication layer in Java and Python on AWS (S3, DynamoDB, Step Functions) that reduced cross-account model deployment from five steps to one for 20 scientists.
                To support it all, I automated Python packaging, secure artifact uploads, and CloudWatch monitoring.
            </p>
        </div>

        <div class="experience-item">
            <h3>Binaural Hearing Lab</h3>
            <div class="experience-meta">Feb 2025 - Aug 2025</div>
            <div class="experience-role">Undergraduate Research Assistant</div>
            <p>
            At the Binaural Hearing Lab, I documented and adapted the MATLAB processing code of CCi-MOBILE, a mobile cochlear-implant research platform, for the lab's experiments under Dr. Justin Aronoff. That meant working through its signal-processing chain for generating electrodograms, including the Advanced Combination Encoder (ACE) strategy's audio preprocessing, automatic gain control, and FFT-based filterbanks, as well as its real-time streaming to hardware over an RF interface.
            </p>
        </div>

        <div class="experience-item">
            <h3>National Center for Supercomputing Applications</h3>
            <div class="experience-meta">Aug 2024 - Mar 2025</div>
            <div class="experience-role">Research Assistant – DISSCO</div>
            <p>I worked on DISSCO, Dr. Sever Tipei's C++ platform for algorithmic composition, sound synthesis, and notation. I diagnosed and fixed critical defects in the system, restoring core functionality across about a third of the codebase.</p>
        </div>

        <div class="experience-item">
            <h3>COUNTRY Financial</h3>
            <div class="experience-meta">Jan 2024 - Dec 2024</div>
            <div class="experience-role">Software Developer Intern</div>
            <p>At COUNTRY Financial, I worked on a variety of impactful projects. I designed and implemented a Retrieval-Augmented Generation (RAG) system using Azure OpenAI embeddings and semantic chunking to improve how insurance policy information is retrieved. I also built a proof of concept to migrate GitLab CI/CD runners to Azure Kubernetes Service, projected to save $100K a year in infrastructure, and wrote the validation tests and docs other engineers used to create, connect, and deploy runners. Along the way, I wrote unit tests to achieve 80% code coverage in the data ingestion and curation pipelines, extended the internal testing framework to support dynamic Spark DataFrame operations, and automated a recurring Qualys API job across company devices, saving 8 hours of manual work each week. I collaborated with my team in an Agile environment, participating in daily standups and sprint planning.</p>
        </div>
    </section>

    <section class="section-block">
        <h2>Projects</h2>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/Citymesh" target="_blank" rel="noopener noreferrer">PayOff</a> | Hack@Brown 2026</h3>
            <div class="experience-meta">Feb 2026</div>
            <p>PayOff is an iOS app that lets phones pay each other with zero internet connectivity. I built a custom peer-to-peer transport on Apple's Network framework, with Bonjour-based peer discovery, ping/pong heartbeat failure detection, and automatic reconnection of dropped peers. Payments are relay-safe: each one carries buyer and seller Ed25519 signatures and is wrapped in hybrid AES-GCM/X25519 envelope encryption with per-transaction forward secrecy, so other phones can pass a payment along without reading or tampering with it. Once connectivity returns, an AWS Lambda backend authenticated through AWS Cognito decrypts the envelope via AWS KMS, verifies both signatures, and settles the payment through Stripe. Raw card data never touches the device, since only Stripe-tokenized payment methods are stored in the iOS Keychain. I presented PayOff to 20 industry professionals.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/Soundscape" target="_blank" rel="noopener noreferrer">Soundscape</a> | Swift Student Challenge 2026</h3>
            <div class="experience-meta">Feb 2026</div>
            <p>Soundscape is an interactive spatial audio app for iPhone and iPad, built in SwiftUI and AVFoundation. Users drag drums, bass, and horns around a canvas and hear panning, distance, and reverb change in real time. Each source is spatialized with HRTF rendering through AVAudioEnvironmentNode, which maps 2D screen positions into a 10 m 3D audio space with inverse distance attenuation and a per-source reverb blend. Sources added mid-experience stay sample-synced to a shared loop by computing the loop position from the engine's render time and scheduling a partial buffer before looping. A guided onboarding flow introduces one instrument at a time before freeplay, with haptic feedback and animated distance cues.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/CS-534-Research" target="_blank" rel="noopener noreferrer">Offloaded Spatial Audio Rendering for XR</a> | CS 534: Immersive Computing Systems</h3>
            <div class="experience-meta">Jan - May 2026</div>
            <p>Studied the tradeoffs of offloading a scene-aware spatial audio pipeline for XR headsets to a nearby GPU server. The pipeline estimates room geometry, classifies surface materials using semantic segmentation, and synthesizes a Room Impulse Response (RIR) for binaural rendering. I built the room-geometry stage, back-projecting ScanNet RGB-D depth frames into a world-space point cloud and fitting room dimensions, and synthesized image-source RIRs with pyroomacoustics from that geometry and the segmented materials. With a partner, I profiled four offloading configurations over 1,000+ trials across two device platforms (MacBook M1 Air and NVIDIA Jetson Orin AGX) and a GPU workstation, measuring per-stage latency, network bandwidth, and audio quality via T60 comparison against ScanNet ground-truth RIRs. Found that material segmentation dominates device-side cost and that offloading replaces compute overhead with network overhead on capable hardware. On the Jetson, where local segmentation takes 530ms, offloading reduced update latency by 2.7x and board power by 25%. I first-authored the ACM-format project report.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/CS-537-Research" target="_blank" rel="noopener noreferrer">Bandwidth-Efficient Keyword Spotting</a> | CS 537: Multimedia Systems</h3>
            <div class="experience-meta">Jan - May 2026</div>
            <p>Designed and evaluated five feature-level transmission strategies for a split-inference keyword spotting pipeline, where audio is captured on a constrained edge device and classified on a remote server. Strategies ranged from raw PCM audio to a jointly-trained neural encoder producing compact learned embeddings, along with voice-activity-gated transmission (Silero VAD) and variable-resolution MFCC features. Deployed all five approaches end-to-end over a real TCP network on CloudLab nodes and benchmarked them across accuracy, bandwidth, round-trip latency, and compute cost (MFLOPs) on both device and server using the Google Speech Commands v2 dataset. Learned embeddings degraded gracefully (80% accuracy at 64 bytes vs. 84% for 32 KB of raw audio), while coarser MFCC features collapsed (23% at 1.4 KB). Results showed no single strategy dominates across all deployment constraints, providing practical guidance for engineers navigating the bandwidth-latency-accuracy tradeoff in IoT voice systems.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/CS-417-Final" target="_blank" rel="noopener noreferrer">Beavergeance</a> | CS 417: Virtual Reality</h3>
            <div class="experience-meta">Jan - May 2026</div>
            <p>Beavergeance is a VR forest-defense game for Meta Quest 3, built in Unity with hand-tracked interaction through the XR Interaction Toolkit. It combines stealth-based enemy AI with resource management: enemies spot the player through vision cones built from distance- and angle-based line-of-sight checks, with near-miss audio and particle feedback driving the stealth gameplay. I also built a wave-based enemy spawning system and a damageable moving hazard with spawn immunity, wiring both into a forest-integrity health system with haptic feedback.</p>
        </div>
        <div class="experience-item">
            <h3>Distributed Systems Stack | CS 425: Distributed Systems</h3>
            <div class="experience-meta">Aug - Dec 2025</div>
            <p>Over the course of CS 425, I built up a distributed systems stack piece by piece. It started with a concurrent log-search tool in Go that fans out grep queries across 10 networked VMs in parallel and aggregates results over raw TCP sockets, followed by a SWIM-style gossip membership and failure detection protocol with ping-ack heartbeats and introducer-based joins. On top of that came HyDFS, a replicated distributed file system that uses consistent hashing for replica placement and supports file create, get, and append, multi-replica reads, and replica merging. The last piece was RainStorm, a Flink-style stream processing engine on HyDFS with configurable multi-stage pipelines, exactly-once semantics, task fault recovery, and dynamic autoscaling, benchmarked against Spark Streaming.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/abhishekramakri/Fractured-Double" target="_blank" rel="noopener noreferrer">Fractured Double</a> | Senior Capstone</h3>
            <div class="experience-meta">Aug - Dec 2025</div>
            <p>Fractured Double is a real-time audio effect that reimagines traditional doubling using granular synthesis. The plugin breaks incoming audio into short grains and reconstructs them into two pitch-shifted "ghost" voices, with controlled randomness in pitch and timing to create width and texture without sounding mechanical. I prototyped the effect in SuperCollider, then built the core as a VST3 plugin in C++ using the JUCE framework, implementing the full DSP pipeline: a stereo circular buffer, 40 ms Hann-windowed grains at 50% overlap, paired ±1.2-semitone voices via playback-rate-based pitch shifting, and ±30% randomized grain spacing to avoid periodic artifacts. User-adjustable parameters for pitch depth, jitter, and wet/dry mix make the effect flexible enough for subtle vocal widening or more experimental, ambient sound design.</p>
        </div>
        <div class="experience-item">
            <h3><a href="https://github.com/PillaiFanClub/Ladidadidaaaa" target="_blank" rel="noopener noreferrer">Arcade Karaoke</a> | AWS Award Winner @ Hack@Brown 2025</h3>
            <div class="experience-meta">Feb - May 2025</div>
            <p>As part of a collaborative project, I developed a multiplayer web-based karaoke game that allows players to join remotely using their phones. I implemented post-performance pitch analysis using Dynamic Time Warping (DTW) and librosa for pitch detection, along with a caching system to pre-process reference vocals for faster analysis. Built with React, Express, Python, and WebSockets, the game ensures seamless host-player interactions and real-time audio analysis. Later, for CS 448: Audio Computing Lab, I rebuilt the scorer with a hand-written STFT, harmonic-product-spectrum pitch tracking with median smoothing, octave-independent pitch in cents, and DTW alignment against the reference vocal.</p>
        </div>
        <div class="experience-item">
            <h3>Pure Data Externals in C | MUS 205: Computation and Music II</h3>
            <div class="experience-meta">Aug - Dec 2024</div>
            <p>I extended Pure Data with externals written in C: a resonant biquad low-pass filter with cutoff and resonance controls for a buffer-editor object, a signal-rate phase-modulation inlet with input validation for a wavetable oscillator, and new variants of Xenakis-style dynamic stochastic synthesis using Cauchy-distributed and second-order random walks.</p>
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