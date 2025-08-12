import { JSX, createSignal, mergeProps, splitProps, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { Window } from './Window';
import { StatusBar } from './StatusBar';
import { Button } from './Button';
import { SunkenPanel } from './SunkenPanel';
import { Modal } from './Modal';

interface ImageItem {
  id: string;
  name: string;
  src: string;
  width?: number;
  height?: number;
  size?: number;
  modified?: string;
}

interface ImageViewerProps {
  title?: string;
  images?: ImageItem[];
  class?: string;
  children?: JSX.Element;
}

const sampleImages: ImageItem[] = [
  { 
    id: '1', 
    name: 'sunset.jpg', 
    src: 'https://picsum.photos/800/600?random=1',
    width: 800,
    height: 600,
    size: 245760,
    modified: '12/15/2024'
  },
  { 
    id: '2', 
    name: 'mountain.jpg', 
    src: 'https://picsum.photos/800/600?random=2',
    width: 800,
    height: 600,
    size: 312450,
    modified: '12/14/2024'
  },
  { 
    id: '3', 
    name: 'forest.jpg', 
    src: 'https://picsum.photos/800/600?random=3',
    width: 800,
    height: 600,
    size: 198340,
    modified: '12/13/2024'
  },
  { 
    id: '4', 
    name: 'ocean.jpg', 
    src: 'https://picsum.photos/800/600?random=4',
    width: 800,
    height: 600,
    size: 267890,
    modified: '12/12/2024'
  },
  { 
    id: '5', 
    name: 'city.jpg', 
    src: 'https://picsum.photos/800/600?random=5',
    width: 800,
    height: 600,
    size: 423670,
    modified: '12/11/2024'
  },
];

export function ImageViewer(props: ImageViewerProps) {
  const merged = mergeProps({
    title: 'Image Viewer',
    images: sampleImages
  }, props);
  
  const [local, others] = splitProps(merged, ['title', 'images', 'class']);
  
  const [selectedImageId, setSelectedImageId] = createSignal<string>(local.images[0]?.id || '');
  const [selectedThumbnails, setSelectedThumbnails] = createSignal<string[]>([]);
  const [showDetails, setShowDetails] = createSignal(false);
  const [zoomLevel, setZoomLevel] = createSignal(100);
  const [showModal, setShowModal] = createSignal(false);
  
  const selectedImage = () => local.images.find(img => img.id === selectedImageId());
  
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  };
  
  const handleThumbnailClick = (id: string, event: MouseEvent) => {
    if (event.ctrlKey) {
      setSelectedThumbnails(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setSelectedImageId(id);
      setSelectedThumbnails([id]);
    }
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    const currentIndex = local.images.findIndex(img => img.id === selectedImageId());
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : local.images.length - 1;
    } else {
      newIndex = currentIndex < local.images.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImageId(local.images[newIndex].id);
  };

  return (
    <>
      <Window 
        title={local.title} 
        class={cn('image-viewer', local.class)} 
        {...others}
      >
        {/* Toolbar */}
        <div style="display: flex; gap: 4px; padding: 4px; border-bottom: 1px solid #c0c0c0; background: #c0c0c0;">
          <Show when={local.images.length > 1}>
            <Button onClick={() => navigateImage('prev')}>
              ◀
            </Button>
            <Button onClick={() => navigateImage('next')}>
              ▶
            </Button>
          </Show>
          <Button onClick={() => setShowDetails(!showDetails())}>
            {showDetails() ? 'Hide Details' : 'Show Details'}
          </Button>
          <Button onClick={() => setZoomLevel(prev => Math.min(prev + 25, 200))}>
            Zoom In
          </Button>
          <Button onClick={() => setZoomLevel(prev => Math.max(prev - 25, 25))}>
            Zoom Out
          </Button>
          <Button onClick={() => setZoomLevel(100)}>
            Fit
          </Button>
          <Button onClick={() => setShowModal(true)}>
            Full Size
          </Button>
        </div>
        
        {/* Main Content Area */}
        <div style="display: flex; height: 400px; gap: 4px; margin: 4px;">
          {/* Main Image Display */}
          <div style="flex: 1; display: flex; flex-direction: column;">
            <SunkenPanel style="flex: 1; padding: 8px; background: #c0c0c0; overflow: auto;">
              <Show when={selectedImage()} fallback={<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #808080;">No image selected</div>}>
                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
                  <img 
                    src={selectedImage()!.src} 
                    alt={selectedImage()!.name}
                    style={`
                      max-width: ${zoomLevel()}%; 
                      max-height: ${zoomLevel()}%; 
                      border: 2px inset #c0c0c0;
                      image-rendering: pixelated;
                      cursor: pointer;
                    `}
                    onClick={() => setShowModal(true)}
                  />
                </div>
              </Show>
            </SunkenPanel>
            
            {/* Thumbnail Strip - Only show if more than 1 image */}
            <Show when={local.images.length > 1}>
              <div style="height: 80px; margin-top: 4px;">
                <SunkenPanel style="height: 100%; padding: 4px; overflow-x: auto; overflow-y: hidden;">
                  <div style="display: flex; gap: 4px; height: 100%;">
                    <For each={local.images}>
                      {(image) => (
                        <div 
                          class={cn(
                            'thumbnail',
                            (selectedImageId() === image.id || selectedThumbnails().includes(image.id)) && 'selected'
                          )}
                          style={`
                            flex: 0 0 60px;
                            height: 60px;
                            border: 2px ${selectedImageId() === image.id ? 'inset' : 'outset'} #c0c0c0;
                            cursor: pointer;
                            overflow: hidden;
                            background: ${selectedThumbnails().includes(image.id) ? '#0000ff' : 'white'};
                            padding: 2px;
                          `}
                          onClick={(e) => handleThumbnailClick(image.id, e)}
                        >
                          <img 
                            src={image.src} 
                            alt={image.name}
                            style="width: 100%; height: 100%; object-fit: cover;"
                          />
                        </div>
                      )}
                    </For>
                  </div>
                </SunkenPanel>
              </div>
            </Show>
          </div>
          
          {/* Details Panel */}
          <Show when={showDetails()}>
            <div style="width: 200px; display: flex; flex-direction: column;">
              <SunkenPanel style="flex: 1; padding: 8px; background: #c0c0c0;">
                <Show when={selectedImage()}>
                  <div style="font-size: 11px;">
                    <div style="font-weight: bold; margin-bottom: 8px;">Image Properties</div>
                    
                    <div style="margin-bottom: 4px;">
                      <strong>Name:</strong><br />
                      {selectedImage()!.name}
                    </div>
                    
                    <div style="margin-bottom: 4px;">
                      <strong>Dimensions:</strong><br />
                      {selectedImage()!.width} × {selectedImage()!.height} pixels
                    </div>
                    
                    <div style="margin-bottom: 4px;">
                      <strong>File Size:</strong><br />
                      {formatFileSize(selectedImage()!.size)}
                    </div>
                    
                    <div style="margin-bottom: 4px;">
                      <strong>Modified:</strong><br />
                      {selectedImage()!.modified}
                    </div>
                    
                    <div style="margin-bottom: 8px;">
                      <strong>Zoom:</strong><br />
                      {zoomLevel()}%
                    </div>
                    
                    <div>
                      <strong>Selection:</strong><br />
                      {selectedThumbnails().length} of {local.images.length} selected
                    </div>
                  </div>
                </Show>
              </SunkenPanel>
            </div>
          </Show>
        </div>
        
        <StatusBar fields={[
          selectedImage() ? selectedImage()!.name : 'No image',
          `${local.images.length} images`,
          `Zoom: ${zoomLevel()}%`,
          selectedImage() ? `${selectedImage()!.width}×${selectedImage()!.height}` : ''
        ]} />
      </Window>

      {/* Full Size Modal */}
      <Modal
        open={showModal()}
        title={selectedImage()?.name || 'Image'}
        onClose={() => setShowModal(false)}
        width="90vw"
        height="90vh"
      >
        <Show when={selectedImage()}>
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: black;">
            <img 
              src={selectedImage()!.src} 
              alt={selectedImage()!.name}
              style="max-width: 100%; max-height: 100%; object-fit: contain;"
            />
          </div>
        </Show>
      </Modal>
    </>
  );
}