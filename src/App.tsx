import { useState } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { useForm } from 'react-hook-form'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/ui/carousel'
import { Badge } from './components/ui/badge'

interface RepoProps {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  archived: boolean
  disabled: boolean
  open_issues_count: number
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

interface UserProps {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable: boolean
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

interface UserFormProps {
  user: string
}

export function App() {
  const [user, setUser] = useState<UserProps | null>(null)
  const [repo, setRepo] = useState<RepoProps[]>([])
  const { register, handleSubmit } = useForm<UserFormProps>()

  const onSubmit = ({ user }: UserFormProps) => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user}`)
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          throw new Error('Erro ao obter os dados do usuário')
        }
      } catch (error) {
        console.log('error:', error)
      }
    }

    const fetchRepo = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${user}/repos`,
        )
        if (response.ok) {
          const userData = await response.json()
          setRepo(userData)
        } else {
          throw new Error('Erro ao obter os dados do usuário')
        }
      } catch (error) {
        console.log('error:', error)
      }
    }

    fetchRepo()
    fetchUser()
  }

  return (
    <div className="w-screen h-screen flex flex-col py-10 gap-6 justify-start items-center bg-neutral-950 ">
      <h1 className="text-white">Coloque um nome de perfil Github</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 w-[400px]">
        <Input type="text" className="dark text-white" {...register('user')} />
        <Button variant="outline" type="submit">
          Search
        </Button>
      </form>
      {user && (
        <div className="text-white">
          <div className="flex justify-center items-center gap-2">
            <img
              src={user.avatar_url}
              alt={`avatar de ${user.name}`}
              className="size-20 rounded-full"
            />
            <div className="space-y-1">
              <a
                href="https://github.com/wendesongomes"
                target="_blank"
                className="text-lg font-bold underline"
                rel="noreferrer"
              >
                {user.name}
              </a>
              <p className="text-xs max-w-[300px]">Bio: {user.bio}</p>
              <div className="flex gap-2">
                <p className="text-xs">Repos: {user.public_repos}</p>
                <p className="text-xs">Location: {user.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {repo && (
        <Carousel className="max-w-[300px] text-white">
          <CarouselContent>
            {repo.map((item, index) => (
              <CarouselItem key={index} className="flex flex-col gap-2">
                <div>{item.language && <Badge>{item.language}</Badge>}</div>
                <a
                  href={item.html_url}
                  target="_blank"
                  className="text-sm font-bold underline"
                  rel="noreferrer"
                >
                  {item.name}
                </a>
                <p className="text-xs">{item.description}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="dark" />
          <CarouselNext className="dark" />
        </Carousel>
      )}
    </div>
  )
}
