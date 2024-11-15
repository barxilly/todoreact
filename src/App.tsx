import { Card, AppShell, Center, Image, Stack, Text, MantineProvider, ActionIcon, TextInput, Button, Checkbox, Popover, Skeleton, Loader, useMantineColorScheme, ColorInput } from '@mantine/core'
import './App.css'
import { createRoot, Root } from 'react-dom/client'
import { FaPlus, FaRocket, FaTrash } from "react-icons/fa6";
let root: Root | null = null
import { useState, useEffect } from 'react';
import { DateInput } from '@mantine/dates';
import { FaCog } from 'react-icons/fa';

let soundsOn = true;
let colour = localStorage.getItem('colour') || '#e3a7ec';

function App() {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const toDoList = JSON.parse(localStorage.getItem('toDoList') || '[]');
    if (toDoList.length === 0) {
      setPopoverOpen(true);
    }
  }, []);

  const mantineColor = useMantineColorScheme();
  mantineColor.setColorScheme('auto');

  return (
    <>
      <style id="theme">
        {`:root {
          --mantine-color-blue-filled: ${colour}dd !important;
          --mantine-color-blue-filled-hover: ${colour}ff !important;
          --mantine-color-dark-filled: ${colour}dd !important;
          --mantine-color-dark-filled-hover: ${colour}ff !important;
      }`}
      </style>
      <div id="pre">
        <AppShell>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: '30%',
              breakpoint: 'xs',
            }}
            padding="md"
          >
            <AppShell.Header>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <Text id="logo" style={{ fontFamily: 'Sour Gummy, sans-serif', fontWeight: 700, marginLeft: '0.5em', marginTop: '0.1em', fontSize: '2em' }} onClick={async () => { const o = new Audio('./sounds/o.wav'); if (soundsOn) await o.play(); window.location.reload(); }}>
                  To-Do React
                </Text>
                <Text id="titlink" size="sm" style={{ fontFamily: 'sans-serif', fontWeight: 'normal', marginTop: '0.4em', color: '#777' }} onClick={() => { const o = new Audio('./sounds/o.wav'); if (soundsOn) o.play(); window.open('https://benjs.uk', '_blank'); }}>
                  @benjs.uk
                </Text>
              </div>
            </AppShell.Header>

            <AppShell.Navbar p="md" style={{ overflowY: 'scroll' }}>
              {Array(15)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} h={28} mt="sm" animate={true} />
                ))}
            </AppShell.Navbar>

            <AppShell.Main className='center'>
              <Stack style={{ textAlign: 'center', position: 'relative' }}>
                <Loader color='gray' type='dots' />
              </Stack>
            </AppShell.Main>
          </AppShell>
        </AppShell>

      </div >

      <div id="content">
        <AppShell>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: '30%',
              breakpoint: 'xs',
            }}
            padding="md"
          >
            <AppShell.Header>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <Text id="logo" style={{ fontFamily: 'Sour Gummy, sans-serif', fontWeight: 700, marginLeft: '0.5em', marginTop: '0.1em', fontSize: '2em' }} onClick={async () => { const o = new Audio('./sounds/o.wav'); if (soundsOn) await o.play(); window.location.reload(); }}>
                  To-Do React
                </Text>
                <Text id="titlink" size="sm" style={{ fontFamily: 'sans-serif', fontWeight: 'normal', marginTop: '0.4em', color: '#777' }} onClick={() => { const o = new Audio('./sounds/o.wav'); if (soundsOn) o.play(); window.open('https://benjs.uk', '_blank'); }}>
                  @benjs.uk
                </Text>
              </div>
              <ActionIcon id="settingsbtn" className='settingsbtn' onClick={() => { const a = new Audio('./sounds/a.wav'); if (soundsOn) a.play(); settings(); }}>
                <FaCog className='settingsicon' />
              </ActionIcon>
            </AppShell.Header>

            <AppShell.Navbar id="nav" p="md" style={{ overflowY: 'scroll' }}>
            </AppShell.Navbar>

            <AppShell.Main id='main' className='center'>
              <Stack style={{ textAlign: 'center', position: 'relative' }}>
                <FaRocket id="rocket" onClick={() => {
                  const rocket = document.getElementById('rocket')!;
                  rocket.classList.add('shake');
                  console.log('shake');
                  setTimeout(() => {
                    rocket.classList.remove('shake');
                  }, 1000);
                }} />
                <h2 style={{ margin: '0' }}>Nothing to see here</h2>
                <p style={{ margin: '0', padding: '0 1em 1em 0' }}>Select a task from the list, or make a new one using the button below.</p>
              </Stack>
              <Popover id="pop" opened={isPopoverOpen} position='top' withArrow>
                <Popover.Target>
                  <ActionIcon variant="filled" size="xl" radius="xl" aria-label="Settings" className='newbutt' onClick={newItem}>
                    <FaPlus />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text>Create a new task with the plus icon.</Text>
                </Popover.Dropdown>
              </Popover>
            </AppShell.Main>
          </AppShell>
        </AppShell>
      </div>

      <div id="soz" style={{ width: '100%', height: '100vh', display: 'none' }}>
        <Center style={{ height: '100vh', verticalAlign: 'middle', padding: '1em' }}>
          <Stack>
            <h1 style={{ textAlign: 'center' }}>Sorry, only standard resolution desktop is supported.</h1>
            <p style={{ textAlign: 'center', margin: '0' }}>You are seeing this message because either your device registers as mobile, or the browser window is too small.</p>
            <sup style={{ textAlign: 'center', padding: '1em', margin: '0' }}>p.s. if you're coming from High Seas, please don't vote this project down due to this, maybe skip instead ❤️</sup>
          </Stack>
        </Center>
      </div>

      <Image
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        width={1}
        height={1}
        onLoad={load}
        style={{ opacity: 0 }}
      />
    </>
  )
}

/** 
 * Checks if the device is mobile or not
 */
function isMobile() {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true
  } else if (document.documentElement.clientWidth <= 650) {
    return true
  } else {
    return false
  }
}

/**
 * Shows settings
 */
function settings() {
  const main = document.getElementById('main')!
  main.classList.remove('center')
  const send = (
    <><style>
      {`
        .pgtodotitle {
          font-size: 1.5em;
          margin-top: 0.6em;
          margin-left: 0.25em;
          margin-bottom: 0.2em;
        }
        .tododate {
          font-size: 0.8em;
          margin-top: 0em;
          margin-left: 0.5em;
          color: #999;
        }
        .tododesc {
          font-size: 0.8em;
          margin-top: 0.6em;
          margin-left: 0.5em;
        }
        .chb {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          margin-left: 0.5em;
        }
        #col {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
      `}
    </style><MantineProvider>
        <h2 className='pgtodotitle'>Settings</h2>
        <Checkbox id="souch" className='chb' defaultChecked={soundsOn} label="Enable sounds" onChange={() => { toggleSounds(); }} />
        <ColorInput
          id="col"
          label="Theme"
          defaultValue={colour}
          onChange={(e) => {
            const s = new Audio('./sounds/s.wav');
            if (soundsOn) s.play();
            colour = e;
            const theme = document.getElementById('theme')! as HTMLStyleElement;
            theme.innerHTML = `
            :root {
              --mantine-color-blue-filled: ${colour}dd !important;
              --mantine-color-blue-filled-hover: ${colour}ff !important;
              --mantine-color-dark-filled: ${colour}dd !important;
              --mantine-color-dark-filled-hover: ${colour}ff !important;
            }
            `;
            localStorage.setItem('colour', colour);
          }}
        />

        <ActionIcon variant="filled" size="xl" radius="xl" aria-label="Settings" className='newbutt' onClick={newItem}>
          <FaPlus />
        </ActionIcon>
      </MantineProvider></>
  )
  if (!root) {
    root = createRoot(main)
  }
  root.render(send)
}

/**
 * Shows task creation form
 */
function newItem() {
  const n = new Audio('./sounds/n.wav');
  if (soundsOn) n.play();
  const main = document.getElementById('main')!
  main.classList.add('center')
  const pstyle = document.createElement('style');
  pstyle.innerHTML = `
  .mantine-Popover-dropdown {
    display: none;
  }
  `;
  document.head.appendChild(pstyle);
  const form = (
    <MantineProvider>
      <form onSubmit={(e) => { e.preventDefault(); addNewItem(e) }}>
        <TextInput
          label="Title"
          placeholder="Enter a title"
          required
          id="intitle"
        />
        <TextInput
          label="Description"
          placeholder="Enter a description"
          id="indesc"
        />
        <DateInput
          label="Due date"
          id="indate"
          locale='en-gb'
          placeholder='December 25, 2024'
        />
        <Button id="inbutt" type="submit" color="dark" radius="md" size="md" onClick={() => {
          const inputElement = document.getElementById('intitle') as HTMLInputElement;
          if (inputElement.value === '') {
            const e = new Audio('./sounds/e.wav');
            if (soundsOn) e.play();
            return;
          } else {
            const b = new Audio('./sounds/b.wav');
            if (soundsOn) b.play();
          }
        }}>
          Add
        </Button>
      </form>
    </MantineProvider>
  )



  if (!root) {
    root = createRoot(main);
  }

  root.render(form);
}

/** 
 * Toggles sounds
 */
function toggleSounds() {
  soundsOn = !soundsOn;
  localStorage.setItem('sounds', JSON.stringify(soundsOn));
}


/**
 * Removes a task from local storage and from the navbar
 */
function removeItem(id: string) {
  const toDoList = JSON.parse(localStorage.getItem('toDoList')!);
  const newToDoList = toDoList.filter((item: any) => item.id !== id);
  localStorage.setItem('toDoList', JSON.stringify(newToDoList));
  const navbar = document.getElementById('nav')!;
  navbar.innerHTML = '';
  for (let i = 0; i < newToDoList.length; i++) {
    addToDoItem(newToDoList[i]);
  }
  if (newToDoList.length === 0) {
    window.location.reload();
  }
  loadPage(newToDoList[newToDoList.length - 1]);
}

/**
 * Adds a new task to local storage and to the navbar
 * Then loads the task page
 */
function addNewItem(e: any) {
  e.preventDefault();
  const title = (document.getElementById('intitle') as HTMLInputElement)!.value;
  const desc = (document.getElementById('indesc') as HTMLInputElement)!.value;
  const date = (document.getElementById('indate') as HTMLInputElement)!.value;
  const toDoItem = {
    title: title,
    description: desc,
    dueDate: date,
    completed: false,
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  }
  console.log(toDoItem);
  localStorage.setItem('toDoList', JSON.stringify([...JSON.parse(localStorage.getItem('toDoList')!), toDoItem]));
  addToDoItem(toDoItem);
  loadPage(toDoItem);
}


/**
 * Adds a task to the navbar
 */
function addToDoItem(toDoItem: any) {
  const navbar = document.getElementById('nav')!;
  const cardContainer = document.createElement('div');
  navbar.appendChild(cardContainer);

  const root = createRoot(cardContainer);
  console.log(toDoItem);

  if (toDoItem.completed) {
    root.render(
      <MantineProvider>
        <Card shadow="md" radius="md" id={toDoItem.id} withBorder className='todocard completed' onClick={() => { loadPage(toDoItem) }}>
          <h3 className='todotitle'>{toDoItem.title}</h3>
          <Checkbox id={"checkbox" + toDoItem.id} onChange={() => { toggleCompleted(toDoItem) }} style={{
            position: 'absolute',
            right: '10px',
            top: '25%'
          }} />
        </Card>
      </MantineProvider>
    );
  } else {
    root.render(
      <MantineProvider>
        <Card shadow="md" radius="md" id={toDoItem.id} withBorder className='todocard' onClick={() => { loadPage(toDoItem) }}>
          <h3 className='todotitle'>{toDoItem.title}</h3>
          <Checkbox id={"checkbox" + toDoItem.id} onChange={() => { toggleCompleted(toDoItem) }} style={{
            position: 'absolute',
            right: '10px',
            top: '25%'
          }} />
        </Card>
      </MantineProvider>
    );
  }
}


/**
 * Toggles the completed status of a task
 */
function toggleCompleted(toDoItem: any) {

  toDoItem.completed = !toDoItem.completed;
  localStorage.setItem('toDoList', JSON.stringify(JSON.parse(localStorage.getItem('toDoList')!).map((item: any) => {
    if (item.id === toDoItem.id) {
      item.completed = !item.completed;
    }
    return item;
  })));
  loadPage(toDoItem);
  if (toDoItem.completed) {
    const d = new Audio('./sounds/d.wav');
    if (soundsOn) d.play();
    const card = document.getElementById(toDoItem.id)!;
    card.classList.add('completed');
  } else {
    const c = new Audio('./sounds/c.wav');
    if (soundsOn) c.play();
    const card = document.getElementById(toDoItem.id)!;
    card.classList.remove('completed');
  }
}

/**
 * Loads the task page
 */
function loadPage(toDoItem: any) {
  // Play t.wav sound
  const audio = new Audio('./sounds/t.wav');
  if (soundsOn) audio.play();
  const main = document.getElementById('main')!
  main.classList.remove('center')
  const send = (
    <MantineProvider>
      <style>
        {`
        .pgtodotitle {
          font-size: 1.5em;
          margin-top: 0.6em;
          margin-left: 0.25em;
          margin-bottom: 0.2em;
        }
        .tododate {
          font-size: 0.8em;
          margin-top: 0em;
          margin-left: 0.5em;
          color: #999;
        }
        .tododesc {
          font-size: 0.8em;
          margin-top: 0.6em;
          margin-left: 0.5em;
        }
      `}
      </style>
      <h2 className='pgtodotitle'>{toDoItem.title}</h2>
      <p className='tododate'>Due: {toDoItem.dueDate}</p>
      <p className='tododesc'>{toDoItem.description}</p>
      <ActionIcon variant="filled" size="xl" radius="xl" aria-label="Settings" className='newbutt' onClick={newItem}>
        <FaPlus />
      </ActionIcon>
      <ActionIcon variant="filled" size="xl" radius="xl" aria-label="Remove" className='rembutt' onClick={() => { const r = new Audio('./sounds/r.wav'); if (soundsOn) r.play(); removeItem(toDoItem.id); }}>
        <FaTrash />
      </ActionIcon>
    </MantineProvider>
  )

  if (!root) {
    const rootm = createRoot(main)
    rootm.render(send)
    root = rootm
  } else {
    root.render(send)
  }

}

/**
 * Loads the app
 */
function load() {
  // Check local storage for sounds
  const localStorageSounds = localStorage.getItem('sounds')
  if (localStorageSounds) {
    soundsOn = JSON.parse(localStorageSounds)
  } else {
    localStorage.setItem('sounds', JSON.stringify(true))
  }

  document.getElementById('content')!.style.display = 'none';
  setInterval(() => {
    // Play sounds at 0 volume to load them
    const o = new Audio('./sounds/o.wav');
    o.volume = 0;
    o.play();
    const t = new Audio('./sounds/t.wav');
    t.volume = 0;
    t.play();
    const n = new Audio('./sounds/n.wav');
    n.volume = 0;
    n.play();
    const b = new Audio('./sounds/b.wav');
    b.volume = 0;
    b.play();
    const e = new Audio('./sounds/e.wav');
    e.volume = 0;
  }, 2000);
  setInterval(() => {
    if (isMobile()) {
      console.log('mobile')
      document.getElementById('content')!.style.display = 'none'
      document.getElementById('soz')!.style.display = 'block'
      const popover = document.getElementsByClassName('mantine-Popover-dropdown')[0] as HTMLDivElement;
      popover.style.display = 'none';
    } else {
      console.log('desktop')
      document.getElementById('soz')!.style.display = 'none'

      // Get all checkboxes, if the corresponding to-do item is completed, check it
      const checkboxes = document.getElementsByClassName('mantine-Checkbox-input') as unknown as NodeListOf<HTMLInputElement>;
      const toDoList = JSON.parse(localStorage.getItem('toDoList')!);
      // For each checkbox, check the corresponding to-do item
      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        const toDoItem = toDoList.find((item: any) => item.id === checkbox.id.split('checkbox')[1]);
        if (toDoItem) {
          if (toDoItem.completed) {
            checkbox.checked = true;
          }
        }
      }
      const souch = document.getElementById('souch')! as HTMLInputElement;

      if (souch) {
        if (soundsOn) {
          souch.checked = true;
        } else {
          souch.checked = false;
        }
      }
      const popover = document.getElementsByClassName('mantine-Popover-dropdown')[0] as HTMLDivElement;
      document.getElementById('content')!.style.display = 'block'
      document.getElementById('pre')!.style.display = 'none'
      if (!popover) return;
      popover.style.display = '';

    }
  }, 330)

  // Check local storage for to-do list
  const localStorageToDoList = localStorage.getItem('toDoList')
  if (localStorageToDoList) {
    const toDoList = JSON.parse(localStorageToDoList)
    console.log(toDoList)
  } else {
    localStorage.setItem('toDoList', JSON.stringify([]))
  }

  // For each to-do item, add a card in the navbar
  const toDoList = JSON.parse(localStorage.getItem('toDoList')!)
  for (let i = 0; i < toDoList.length; i++) {
    if (!toDoList[i].completed) {
      const toDoItem = toDoList[i]
      // Add a card in the navbar
      addToDoItem(toDoItem)
    }
  }
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].completed) {
      const toDoItem = toDoList[i]
      // Add a card in the navbar
      addToDoItem(toDoItem)
    }
  }
}

export default App
