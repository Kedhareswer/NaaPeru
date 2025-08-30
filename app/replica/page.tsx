import { ProjectHeroReplica } from "@/components/ui/project-hero-replica";

export default function ReplicaPage() {
  return (
    <ProjectHeroReplica
      title="Fake News Detection"
      category="Deep Learning"
      technologies={["Python", "TensorFlow", "NLP", "BERT", "Scikit-learn"]}
      githubUrl="https://github.com/username/fake-news-detection"
      kaggleUrl="https://www.kaggle.com/username/fake-news-detection"
      demoUrl="https://fake-news-detection-demo.vercel.app"
      imageUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      description="A deep learning model that detects fake news articles with high accuracy. The model uses BERT for natural language understanding and is trained on a large dataset of real and fake news articles. The system can be used to verify the authenticity of news articles and help combat the spread of misinformation online. The project includes a user-friendly web interface for easy interaction with the model."
    />
  );
}
